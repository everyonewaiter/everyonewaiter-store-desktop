import { useLocation, useNavigate } from "react-router-dom";
import { FileCheckIcon, MoneyCoinIcon, ReturnIcon } from "@renderer/assets/icons";
import { LogoIcon, LogoTextIcon } from "@renderer/assets/logos";
import Button from "@renderer/components/Button/Button";
import { ColorName } from "@renderer/constants/ui";
import { WEEK_NAME } from "@renderer/constants/week";
import { useCurrentTime } from "@renderer/hooks/useCurrentTime";
import PosPaymentsSalesModalComp from "@renderer/pages/pos/payments/PosPaymentsSalesModalComp";
import PosStoreCloseModalComp from "@renderer/pages/pos/PosStoreCloseModalComp";
import { overlay } from "overlay-kit";

function PosHeaderComp() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { date } = useCurrentTime();

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
            <>
              <Button
                variant="outline"
                color="grey"
                className="text-gray-0 flex items-center gap-2.5 rounded-xl border-gray-600 px-4 py-3 text-lg font-normal"
                onClick={() => navigate(-1)}
              >
                <ReturnIcon width={28} height={28} color="#222222" />
                돌아가기
              </Button>
              <Button
                variant="outline"
                color="grey"
                className="text-gray-0 flex items-center gap-2.5 rounded-xl border-gray-600 px-4 py-3 text-lg font-normal"
                onClick={() =>
                  overlay.open((overlayProps) => <PosPaymentsSalesModalComp {...overlayProps} />)
                }
              >
                <MoneyCoinIcon width={28} height={28} color="#222222" />
                매출 확인
              </Button>
            </>
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
            className="text-gray-0 gap-3 rounded-[40px] border-[#6BD876] bg-[#E1F7E4] py-2.5 pr-4 pl-3 text-base font-normal hover:bg-[#E1F7E4]"
            onClick={() =>
              overlay.open((overlayProps) => (
                <PosStoreCloseModalComp {...overlayProps} onSuccess={() => navigate("/pos")} />
              ))
            }
          >
            <div className="bg-status-success h-[23px] w-[23px] rounded-full" />
            영업 중
          </Button>
        </nav>
      </div>
      <hr className="h-[1px] w-full bg-gray-600" />
    </header>
  );
}

export default PosHeaderComp;
