import { Button } from "@renderer/components";
import { StaffCall } from "@renderer/types/domain";

interface HallStaffCallCompProps {
  staffCall: StaffCall;
}

function HallStaffCallComp({ staffCall }: HallStaffCallCompProps) {
  return (
    <div className="flex w-[308px] flex-shrink-0 flex-col gap-3 rounded-3xl border border-gray-600 p-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <span className="text-gray-0 text-2xl font-semibold">테이블 번호</span>
          <strong className="text-gray-0 text-4xl font-bold">
            {String(staffCall.tableNo).padStart(2, "0")}
          </strong>
        </div>
        <div className="flex h-[126px] w-full items-center justify-center rounded-xl border border-gray-600 text-lg font-semibold">
          {staffCall.name}
        </div>
      </div>
      <Button color="black" className="button-lg">
        완료
      </Button>
    </div>
  );
}

export default HallStaffCallComp;
