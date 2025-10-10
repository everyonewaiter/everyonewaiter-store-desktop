import { Waiting } from "@renderer/types/domain";
import cn from "@renderer/utils/cn";

interface WaitingNumberingCompProps {
  index: number;
  data: Waiting[];
}

function WaitingNumberingComp({ index, data }: WaitingNumberingCompProps) {
  return (
    <aside className="relative flex h-full w-12 flex-col items-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl font-semibold text-white">
        {String(index + 1).padStart(2, "0")}
      </span>
      {index < data.length - 1 && (
        <div className="absolute top-[calc(50%+24px+8px)] left-1/2 z-50 h-[calc(225px-48px-8px)] w-0.5 -translate-x-1/2 bg-gray-100 md:hidden lg:block" />
      )}
      {index < data.length - 1 && (
        <div
          className={cn(
            "absolute left-1/2 z-50 w-0.5 -translate-x-1/2 bg-gray-100 md:block lg:hidden",
            data[index].callCount > 0 && data[index + 1].callCount > 0
              ? "top-[calc(50%+24px+12px)] h-[calc(260px-45px)]"
              : "top-[calc(50%+24px+12px)] h-[calc(260px-29px-12px-12px)]"
          )}
        />
      )}
    </aside>
  );
}

export default WaitingNumberingComp;
