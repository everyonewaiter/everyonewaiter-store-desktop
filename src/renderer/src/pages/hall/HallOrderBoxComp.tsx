import { Button } from "@renderer/components";
import HallOrderOptionComp from "@renderer/pages/hall/HallOrderOptionComp";
import { OrderMenu } from "@renderer/types/domain";
import cn from "@renderer/utils/cn";

interface HallOrderBoxCompProps {
  orderMenu: OrderMenu;
  isCompleted?: boolean;
}

function HallOrderBoxComp({ orderMenu, isCompleted = false }: HallOrderBoxCompProps) {
  // TODO: false인 경우 레이아웃 깨짐 현상 해결 필요
  const showImage = true;
  const isServed = orderMenu.served;

  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-6 rounded-xl border border-gray-600 p-6",
        isServed ? "bg-[#F1F1F1]" : ""
      )}
    >
      <div className="flex flex-col gap-6">
        {showImage && (
          <div className="relative h-[130px] w-[130px] overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-[#F1F1F1] opacity-50" />
            {/* TODO: 테스트용 이미지 교체 필요 */}
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
              {orderMenu.orderOptionGroups
                .flatMap((orderOptionGroup) => orderOptionGroup.orderOptions)
                .map((orderOption, index) => (
                  // TODO: key로 index 사용 지양, orderOptionId가 없으므로 대안 고민 필요
                  <HallOrderOptionComp key={index} orderOption={orderOption} isServed={isServed} />
                ))}
            </div>
          )}
        </div>
      </div>
      {!isCompleted && (
        <Button
          color="black"
          variant="outline"
          className={cn(
            "button-lg w-full !text-lg !font-medium",
            isServed
              ? "border-gray-300 text-gray-300 hover:!bg-transparent hover:!text-gray-300"
              : ""
          )}
        >
          {isServed ? "되돌리기" : "완료"}
        </Button>
      )}
    </div>
  );
}

export default HallOrderBoxComp;
