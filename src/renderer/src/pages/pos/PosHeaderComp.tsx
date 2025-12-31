import { useLocation, useNavigate } from "react-router-dom";
import { FileCheckIcon, ReturnIcon } from "@renderer/assets/icons";
import { LogoIcon, LogoTextIcon } from "@renderer/assets/logos";
import Button from "@renderer/components/Button/Button";
import { ColorName } from "@renderer/constants/ui";
import { WEEK_NAME } from "@renderer/constants/week";
import { useCurrentTime } from "@renderer/hooks/useCurrentTime";
import { useGetDevice } from "@renderer/hooks/useGetDevice";
import { useGetStore } from "@renderer/hooks/useGetStore";
import PosStoreCloseModalComp from "@renderer/pages/pos/PosStoreCloseModalComp";
import cn from "@renderer/utils/cn";
import { overlay } from "overlay-kit";

function PosHeaderComp() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { date } = useCurrentTime();

  const { device } = useGetDevice();
  const { store } = useGetStore(device?.storeId ?? "");

  const handleStoreStatusClick = () => {
    overlay.open((overlayProps) => (
      <PosStoreCloseModalComp {...overlayProps} onSuccess={() => navigate("/pos")} />
    ));
  };

  return (
    <header className="flex w-full flex-col gap-8 px-15 pt-10">
      <div className="flex w-full items-center justify-between">
        <button
          type="button"
          className="flex w-fit cursor-pointer items-center gap-5"
          onClick={() => navigate("/pos")}
        >
          <LogoIcon className="h-15 w-15" />
          <LogoTextIcon className="h-[25px]" />
        </button>
        <time className="text-gray-0 text-2xl font-medium">
          {date.format(`YYYY.MM.DD(${WEEK_NAME[date.day()]}) HH:mm`)}
        </time>
        <nav className="flex items-center gap-6">
          {pathname === "/pos/payments" && (
            <Button
              variant="outline"
              color="grey"
              className="text-gray-0 flex items-center gap-2.5 rounded-xl border-gray-600 px-4 py-3 text-lg font-normal"
              onClick={() => navigate(-1)}
            >
              <ReturnIcon width={28} height={28} color="#222222" />
              돌아가기
            </Button>
          )}
          {pathname === "/pos/tables" && (
            <Button
              variant="outline"
              color={ColorName.GREY}
              className="text-gray-0 flex items-center gap-2.5 rounded-xl border-gray-600 px-4 py-3 text-lg font-normal"
              onClick={() => navigate("/pos/payments")}
            >
              <FileCheckIcon className="text-gray-0 h-7 w-7" />
              결제 내역
            </Button>
          )}
          <Button
            className={cn(
              "gap-3 rounded-[40px] py-2.5 pr-4 pl-3 text-base font-normal",
              store?.status === "OPEN"
                ? "text-gray-0 border-[#6BD876] bg-[#E1F7E4] hover:bg-[#E1F7E4]"
                : "border-gray-400 bg-gray-600 text-gray-300 hover:bg-gray-600"
            )}
            onClick={handleStoreStatusClick}
          >
            <div
              className={cn(
                "h-[23px] w-[23px] rounded-full",
                store?.status === "OPEN" ? "bg-status-success" : "bg-gray-400"
              )}
            />
            {store?.status === "OPEN" ? "영업 중" : "영업 마감"}
          </Button>
        </nav>
      </div>
      <hr className="h-px w-full bg-gray-600" />
    </header>
  );
}

export default PosHeaderComp;
