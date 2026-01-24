import { PlusIcon } from "@renderer/assets/icons";
import { OrderMenuOption } from "@renderer/types/domain";
import cn from "@renderer/utils/cn";

interface HallOrderOptionCompProps {
  orderOption: OrderMenuOption;
  isServed: boolean;
}

function HallOrderOptionComp({ orderOption, isServed }: Readonly<HallOrderOptionCompProps>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        isServed ? "text-gray-300" : "text-[#2E7BB3]"
      )}
    >
      <div className="flex items-center text-[22px] font-medium">
        <PlusIcon className="size-6" />
        {orderOption.name}
      </div>
    </div>
  );
}

export default HallOrderOptionComp;
