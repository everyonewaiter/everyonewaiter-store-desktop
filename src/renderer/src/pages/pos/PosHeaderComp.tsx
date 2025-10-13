import { useNavigate } from "react-router-dom";
import { FileCheckIcon } from "@renderer/assets/icons";
import { LogoIcon, LogoTextIcon } from "@renderer/assets/logos";
import { Button } from "@renderer/components";

function PosHeaderComp() {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col gap-8 px-15 pt-10">
      <div className="flex w-full items-center justify-between">
        <button type="button" className="flex w-fit cursor-pointer items-center gap-5">
          <LogoIcon className="h-15 w-15" />
          <LogoTextIcon className="h-[25px]" />
        </button>
        <span className="text-gray-0 text-2xl font-medium">2025.03.23(금) 18:29</span>
        <div className="flex items-center gap-6">
          <Button
            variant="outline"
            color="grey"
            className="text-gray-0 flex items-center gap-2.5 rounded-xl border-gray-600 px-4 py-3 text-lg font-normal"
            onClick={() => navigate("/pos/payments")}
          >
            <FileCheckIcon className="text-gray-0 h-7 w-7" />
            결제 내역
          </Button>
          <Button className="text-gray-0 gap-3 rounded-[40px] border-[#6BD876] bg-[#E1F7E4] py-2.5 pr-4 pl-3 text-base font-normal hover:bg-[#E1F7E4]">
            <div className="bg-status-success h-[23px] w-[23px] rounded-full" />
            영업 중
          </Button>
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-600" />
    </div>
  );
}

export default PosHeaderComp;
