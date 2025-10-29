import { OrderViewOrderOptionDetail } from "@renderer/api/device/data-contracts";
import { PlusIcon } from "@renderer/assets/icons";
import cn from "@renderer/utils/cn";

interface HallOrderOptionCompProps {
  orderOption: OrderViewOrderOptionDetail;
  isServed: boolean;
}

function HallOrderOptionComp({ orderOption, isServed }: HallOrderOptionCompProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        isServed ? "text-gray-300" : "text-[#2E7BB3]"
      )}
    >
      <div className="flex items-center">
        <PlusIcon className="size-6" />
        {orderOption.name}
      </div>
    </div>
  );
}

export default HallOrderOptionComp;
