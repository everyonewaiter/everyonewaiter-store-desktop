import { useState } from "react";
import { Button } from "@renderer/components";
import { ColorName } from "@renderer/constants";
import HallOrderOptionComp from "@renderer/pages/hall/HallOrderOptionComp";
import { OrderMenu, OrderOption } from "@renderer/types/domain";
import cn from "@renderer/utils/cn";

interface HallOrderBoxCompProps {
  orderMenu: OrderMenu;
  isCompleted?: boolean;
}

function HallOrderBoxComp({ orderMenu, isCompleted = false }: HallOrderBoxCompProps) {
  // TODO: API에서 showImage 설정값 받아와서 적용 필요 (현재는 임시로 true)
  const showImage = true;
  const [isServed, setIsServed] = useState(orderMenu.served);

  const orderOptions: (OrderOption & { orderOptionGroupId: string })[] =
    orderMenu.orderOptionGroups.flatMap((orderOptionGroup) =>
      orderOptionGroup.orderOptions.map((orderOption) => ({
        ...orderOption,
        orderOptionGroupId: orderOptionGroup.orderOptionGroupId,
      }))
    );

  return (
    <div
      className={cn(
        "flex min-h-[279px] flex-col justify-between gap-6 rounded-xl border border-gray-600 p-6",
        isServed ? "bg-[#F1F1F1]" : ""
      )}
    >
      <div className="flex flex-col gap-6">
        {showImage && (
          <div className="relative h-[130px] w-[130px] overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-[#F1F1F1] opacity-50" />
            <img src={orderMenu.image} alt={orderMenu.name} />
          </div>
        )}
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between">
            <span
              className={cn(
                "text-2xl font-semibold",
                isServed ? "text-gray-300 line-through" : "text-gray-100"
              )}
            >
              {orderMenu.name}
            </span>
            <span
              className={cn("text-xl font-semibold", isServed ? "text-gray-300" : "text-gray-100")}
            >
              {orderMenu.quantity}개
            </span>
          </div>
          {orderMenu.orderOptionGroups.length > 0 && (
            <div className="flex flex-col gap-1">
              {orderOptions.map((orderOption) => (
                <HallOrderOptionComp
                  key={`${orderOption.orderOptionGroupId}-${orderOption.name}`}
                  orderOption={orderOption}
                  isServed={isServed}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {!isCompleted && (
        <Button
          color={ColorName.BLACK}
          variant="outline"
          className={cn(
            "button-lg w-full !text-lg !font-medium",
            isServed
              ? "border-gray-300 text-gray-300 hover:!bg-transparent hover:!text-gray-300"
              : ""
          )}
          onClick={() => setIsServed((prev) => !prev)}
        >
          {isServed ? "되돌리기" : "완료"}
        </Button>
      )}
    </div>
  );
}

export default HallOrderBoxComp;
