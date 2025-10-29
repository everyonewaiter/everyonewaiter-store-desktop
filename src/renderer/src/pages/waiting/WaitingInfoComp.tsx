import { WaitingDetailResponse } from "@renderer/api/device/data-contracts";
import { BabyIcon, SmileIcon } from "@renderer/assets/icons";
import cn from "@renderer/utils/cn";

interface WaitingInfoCompProps {
  waiting: WaitingDetailResponse;
  isModal?: boolean;
}

function WaitingInfoComp({ waiting, isModal }: WaitingInfoCompProps) {
  return (
    <div
      className={cn(
        "flex",
        isModal
          ? "w-[308px] flex-col gap-6 rounded-3xl bg-white p-5"
          : "flex-1 flex-col md:gap-6 lg:gap-4"
      )}
    >
      <div className={cn("flex flex-col", isModal ? "gap-3" : "gap-4")}>
        <div className="flex w-fit items-center gap-3 rounded-3xl bg-gray-700 px-4 py-2">
          <span className="flex gap-1">
            <SmileIcon className="h-6 w-6" />
            성인 {waiting.adult}
          </span>
          {(waiting.infant ?? 0) > 0 && (
            <>
              <span className="bg-gray-0 h-4 w-[1px] flex-shrink-0" />
              <span className="flex gap-1">
                <BabyIcon className="h-6 w-6" />
                아동 {waiting.infant}
              </span>
            </>
          )}
        </div>
        <span className={cn("font-bold", isModal ? "text-[28px]" : "text-3xl")}>
          총 {(waiting.infant ?? 0) + (waiting.adult ?? 0)}명
        </span>
      </div>
      <div className={cn("flex", isModal ? "flex-col gap-3" : "flex-row items-center gap-6")}>
        <span className="text-gray-0 text-xl font-semibold underline underline-offset-3">
          {`${(waiting.phoneNumber ?? "").slice(0, 3)}-${(waiting.phoneNumber ?? "").slice(3, 7)}-${(waiting.phoneNumber ?? "").slice(7)}`}
        </span>
        <time className="flex h-[39px] w-fit items-center gap-2 rounded-lg bg-gray-700 px-4">
          <span className="text-gray-0 text-lg font-semibold">24분 경과</span>
          <span className="text-status-error text-lg font-semibold">18:10:10</span>
        </time>
      </div>
    </div>
  );
}

export default WaitingInfoComp;
