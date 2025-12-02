import { useNavigate } from "react-router-dom";
import posIframe from "@renderer/assets/images/pos-bg.mp4";
import { Button } from "@renderer/components";
import PosPaymentsSalesModalComp from "@renderer/pages/pos/payments/PosPaymentsSalesModalComp";
import PosGoTableListModalComp from "@renderer/pages/pos/PosGoTableListModalComp";
import { useGetDevice } from "@renderer/queries/useGetDevice";
import { useGetStore } from "@renderer/queries/useGetStore";
import { StoreStatus } from "@renderer/types/domain";
import cn from "@renderer/utils/cn";
import dayjs from "dayjs";
import { overlay } from "overlay-kit";

const WEEK_NAME = ["일", "월", "화", "수", "목", "금", "토"];
const STATUS_TEXT: Record<StoreStatus, string> = {
  OPEN: "오픈",
  CLOSE: "마감",
} as const;

function PosPage() {
  const navigate = useNavigate();

  const { device } = useGetDevice();
  const { store } = useGetStore(device?.storeId ?? "");
  const storeStatus = store?.status;
  const storeName = store?.name;

  return (
    <main className="flex h-dvh w-dvw items-center justify-center">
      <div className="absolute top-0 left-0 h-full w-full bg-black/40" />
      <div className="absolute top-0 left-0 flex w-full justify-end px-15 py-10">
        <div className="flex items-center gap-1 rounded-[80px] bg-white/16 px-4 py-2.5">
          {Object.keys(STATUS_TEXT).map((statusEng) => (
            <div
              key={statusEng}
              className={cn(
                "flex items-center justify-center rounded-3xl px-6 py-2 text-xl font-normal",
                storeStatus === statusEng ? "bg-primary text-white" : "text-gray-300"
              )}
            >
              {STATUS_TEXT[statusEng]}
            </div>
          ))}
        </div>
      </div>
      <video className="h-full w-full object-cover" autoPlay loop muted>
        <source src={posIframe} type="video/mp4" />
      </video>
      <section className="absolute flex flex-col gap-20 text-white">
        <header className="flex flex-col gap-4 text-center">
          <time className="text-2xl font-normal text-white">
            {`${dayjs().format("YYYY년 MM월 DD일")} ${WEEK_NAME[dayjs().day()]}요일`}
          </time>
          <h1 className="text-5xl font-bold text-white">안녕하세요, {storeName}입니다.</h1>
        </header>
        <nav className="flex w-[659px] flex-col gap-4">
          <Button
            color="black"
            className="bg-gray-0 h-30 rounded-2xl border-none text-3xl font-bold text-white"
            onClick={() => {
              if (storeStatus === "CLOSE") {
                overlay.open(
                  (overlayProps) => (
                    <PosGoTableListModalComp {...overlayProps} onClick={() => navigate("tables")} />
                  ),
                  {
                    overlayId: "pos-go-table-list-modal",
                  }
                );
              } else {
                navigate("tables");
              }
            }}
          >
            POS
          </Button>
          <Button
            variant="outline"
            className="h-18 rounded-2xl border-white text-2xl font-bold text-white"
            onClick={() => navigate("payments")}
          >
            결제내역
          </Button>
          <Button
            variant="outline"
            className="h-18 rounded-2xl border-white text-2xl font-bold text-white"
            onClick={() =>
              overlay.open((overlayProps) => <PosPaymentsSalesModalComp {...overlayProps} />)
            }
          >
            매출액
          </Button>
        </nav>
      </section>
    </main>
  );
}

export default PosPage;
