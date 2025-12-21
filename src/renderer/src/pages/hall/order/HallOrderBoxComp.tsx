import Button from "@renderer/components/Button/Button";
import CdnImage from "@renderer/components/CdnImage";
import { ColorName } from "@renderer/constants/ui";
import { useGetStore } from "@renderer/hooks/useGetStore";
import { useOrderMenuServe } from "@renderer/hooks/useHallOrderApi";
import HallOrderOptionComp from "@renderer/pages/hall/order/HallOrderOptionComp";
import { OrderMenu, OrderMenuOption } from "@renderer/types/domain";
import cn from "@renderer/utils/cn";
import { handleApiError } from "@renderer/utils/handle-api-error";

interface HallOrderBoxCompProps {
  orderId: string;
  storeId: string;
  orderMenu: OrderMenu;
  isCompleted?: boolean;
}

function HallOrderBoxComp({ orderId, storeId, orderMenu, isCompleted }: HallOrderBoxCompProps) {
  const { store } = useGetStore(storeId);
  const { mutate: mutateOrderMenuServe } = useOrderMenuServe();

  const orderOptions: (OrderMenuOption & { orderOptionGroupId: string })[] =
    orderMenu.orderOptionGroups.flatMap((orderOptionGroup) =>
      orderOptionGroup.orderOptions.map((orderOption) => ({
        ...orderOption,
        orderOptionGroupId: orderOptionGroup.orderOptionGroupId,
      }))
    );

  const handleClick = () => {
    mutateOrderMenuServe(
      { orderId: orderId, orderMenuId: orderMenu.orderMenuId },
      {
        onError: (error) => handleApiError(error),
      }
    );
  };

  return (
    <div
      className={cn(
        "flex min-h-[279px] flex-col justify-between gap-6 rounded-xl border border-gray-600 p-6",
        orderMenu.served ? "bg-[#F1F1F1]" : ""
      )}
    >
      <div className="flex flex-col gap-6">
        {store && store.setting.showOrderMenuImage && (
          <div className="relative h-[130px] w-[130px] overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-[#F1F1F1] opacity-50" />
            <CdnImage
              src={orderMenu.image}
              alt={orderMenu.name}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between">
            <span
              className={cn(
                "text-2xl font-semibold",
                orderMenu.served ? "text-gray-300 line-through" : "text-gray-100"
              )}
            >
              {orderMenu.name}
            </span>
            <span
              className={cn(
                "text-xl font-semibold",
                orderMenu.served ? "text-gray-300" : "text-gray-100"
              )}
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
                  isServed={orderMenu.served}
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
            orderMenu.served
              ? "border-gray-300 text-gray-300 hover:!bg-transparent hover:!text-gray-300"
              : ""
          )}
          onClick={handleClick}
        >
          {orderMenu.served ? "되돌리기" : "완료"}
        </Button>
      )}
    </div>
  );
}

export default HallOrderBoxComp;
