import { Button } from "@renderer/components";
import { ColorName } from "@renderer/constants";
import HallOrderBoxComp from "@renderer/pages/hall/HallOrderBoxComp";
import { Order } from "@renderer/types/domain";
import cn from "@renderer/utils/cn";
import { getFormattedTime } from "@renderer/utils/format";

interface HallOrderCompProps {
  order: Order;
}

function HallOrderComp({ order }: HallOrderCompProps) {
  const isCompleted = order.served;

  return (
    <div className="flex h-full w-full flex-row gap-6">
      <div className="flex flex-[0.2] flex-col rounded-3xl border border-gray-600 p-6">
        <div
          className={cn(
            "relative flex h-full w-full flex-col items-center gap-3",
            isCompleted ? "" : "justify-center"
          )}
        >
          <div className={cn("flex w-full flex-col gap-2.5", isCompleted ? "" : "absolute top-0")}>
            <div className="flex h-[51px] w-full items-center justify-center rounded-xl border border-gray-600">
              주문 시간 {getFormattedTime(order.createdAt)}
            </div>
            {isCompleted && (
              <div className="flex h-[51px] w-full items-center justify-center rounded-xl border border-gray-600">
                완료 시간 {getFormattedTime(order.servedTime)}
              </div>
            )}
          </div>
          {isCompleted ? (
            <div className="flex h-full flex-col items-center justify-center">
              <span className="text-gray-0 text-lg font-medium">테이블 번호</span>
              <strong className="text-gray-0 pt-3 text-4xl font-bold">
                {String(order.tableNo).padStart(2, "0")}
              </strong>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Button
                variant="outline"
                className={cn(
                  "button-sm pointer-events-none !rounded-4xl !text-sm",
                  order.category === "INITIAL" ? "" : "!border-[#00B603] !text-[#00B603]"
                )}
              >
                {order.category === "INITIAL" ? "주문" : "추가"}
              </Button>
              <span className="text-gray-0 pt-6 text-lg font-medium">테이블 번호</span>
              <strong className="text-gray-0 pt-3 text-4xl font-bold">
                {String(order.tableNo).padStart(2, "0")}
              </strong>
              <Button color={ColorName.BLACK} className="button-lg absolute bottom-0 w-full">
                전체 완료
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex h-full flex-[0.8] rounded-3xl border border-gray-600 p-6">
        <div className="flex w-full flex-col gap-4">
          {order.memo && (
            <div className="text-gray-0 flex h-[58px] w-full items-center rounded-xl bg-gray-700 px-5 text-2xl font-semibold">
              메모: {order.memo}
            </div>
          )}
          {order.orderMenus.length > 0 && (
            <div className="grid-auto-rows-[1fr] grid w-full gap-x-2.5 gap-y-4 md:grid-cols-3 lg:grid-cols-4">
              {order.orderMenus
                .sort((a, b) => Number(a.served) - Number(b.served))
                .map((orderMenu) => (
                  <HallOrderBoxComp
                    key={orderMenu.orderMenuId}
                    orderMenu={orderMenu}
                    isCompleted={isCompleted}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HallOrderComp;
