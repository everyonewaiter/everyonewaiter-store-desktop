import { Button } from "@renderer/components";
import OrderBox from "@renderer/pages/pos/payments/PosPaymentsOrderBoxComp";
import PosTablesDetailDiscountModalComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailDiscountModalComp";
import PosTablesDetailPaymentModalComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailPaymentModalComp";
import {
  useGetTableActivity,
  useUpdateOrder,
} from "@renderer/pages/pos/tables/[id]/usePosTablesDetailApi";
import { Order, OrderMenu } from "@renderer/types/domain";
import { getFormattedTableNo } from "@renderer/utils/format";
import { handleApiError } from "@renderer/utils/handle-api-error";
import { overlay } from "overlay-kit";

interface PosTablesDetailCheckoutSideCompProps {
  tableNo: number;
  checkedOrders: Order[];
  setCheckedOrders: (orders: Order[]) => void;
  onCancelPayment: () => void;
}

function PosTablesDetailCheckoutSideComp({
  tableNo,
  checkedOrders,
  setCheckedOrders,
  onCancelPayment,
}: PosTablesDetailCheckoutSideCompProps) {
  const { data: activity } = useGetTableActivity(tableNo);
  const { mutate: updateOrder } = useUpdateOrder();

  const isCompleted =
    (activity?.orderType === "POSTPAID" && activity?.remainingPaymentPrice === 0) ||
    activity?.orderType === "PREPAID";

  const handleUpdateOrder = (type: "add" | "sub", order: Order, menu: OrderMenu) => {
    updateOrder(
      {
        tableNo: order.tableNo,
        orders: [
          {
            orderId: order.orderId,
            orderMenus: [
              {
                orderMenuId: menu.orderMenuId,
                quantity: type === "add" ? menu.quantity + 1 : menu.quantity - 1,
              },
            ],
          },
        ],
      },
      {
        onError: (error) => handleApiError(error),
      }
    );
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-gray-0 text-[28px] font-semibold">
          {getFormattedTableNo(tableNo)}번 테이블
        </h2>
        {activity?.orders && activity?.orders.length > 0 && (
          <Button
            variant="outline"
            className="button-lg !text-medium !rounded-[8px] !text-base"
            onClick={onCancelPayment}
          >
            {activity?.orderType === "PREPAID"
              ? "결제 취소"
              : `${checkedOrders.length > 0 ? "선택" : "전체"} 주문 취소`}
          </Button>
        )}
      </div>
      <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto">
        <div className="flex w-full flex-col gap-8">
          {activity?.orders?.map((order, index) => (
            <OrderBox key={order.orderId}>
              <OrderBox.Index
                index={index}
                hasCheckbox
                checked={checkedOrders.some((o) => o.orderId === order.orderId)}
                onCheckboxChange={(checked) => {
                  if (checked) {
                    setCheckedOrders([...checkedOrders, order]);
                  } else {
                    setCheckedOrders(checkedOrders.filter((o) => o.orderId !== order.orderId));
                  }
                }}
              />
              <OrderBox.Body>
                {order.orderMenus.map((menu) => (
                  <OrderBox.Order
                    key={menu.orderMenuId}
                    orderMenu={menu}
                    onUpdateOrder={(type) => handleUpdateOrder(type, order, menu)}
                  />
                ))}
              </OrderBox.Body>
            </OrderBox>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="h-0.5 w-full bg-gray-600" />
        {activity?.orders && activity?.orders.length > 0 && (
          <div className="flex items-center justify-between">
            <span className="flex-1 text-lg font-normal text-gray-300">할인</span>
            <Button
              variant="outline"
              color="black"
              className="!border-gray-[#4F4F4F] h-10 rounded-lg bg-white px-5 text-[15px] font-medium text-[#4F4F4F]"
              onClick={() =>
                overlay.open((overlayProps) => (
                  <PosTablesDetailDiscountModalComp
                    tableNo={tableNo}
                    totalOrderPrice={activity?.totalOrderPrice ?? 0}
                    initialDiscount={activity?.discount ?? 0}
                    {...overlayProps}
                  />
                ))
              }
            >
              할인수단 추가
            </Button>
          </div>
        )}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="flex-1 text-lg font-normal text-gray-300">총 주문금액</span>
              <span className="text-xl font-medium text-gray-100">
                {activity?.totalOrderPrice?.toLocaleString() ?? 0}원
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex-1 text-lg font-normal text-gray-300">할인된 금액</span>
              <span className="text-primary text-xl font-medium">
                {activity?.discount?.toLocaleString() ?? 0}원
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-0 text-2xl font-semibold">결제할 금액</span>
            <span className="text-gray-0 text-4xl font-bold">
              {activity?.remainingPaymentPrice?.toLocaleString() ?? 0}원
            </span>
          </div>
        </div>
      </div>

      {activity?.orderType === "POSTPAID" && !isCompleted && (
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-16 w-full rounded-xl border !border-gray-200 text-xl font-semibold text-gray-200"
            onClick={() =>
              overlay.open((overlayProps) => (
                <PosTablesDetailPaymentModalComp
                  activity={activity}
                  paymentType="cash"
                  {...overlayProps}
                />
              ))
            }
          >
            현금 결제
          </Button>
          <Button
            color="black"
            className="h-16 w-full rounded-xl text-xl font-semibold"
            onClick={() =>
              overlay.open((overlayProps) => (
                <PosTablesDetailPaymentModalComp
                  activity={activity}
                  paymentType="card"
                  {...overlayProps}
                />
              ))
            }
          >
            카드 결제
          </Button>
        </div>
      )}
      {isCompleted && (
        <Button className="h-16 w-full rounded-xl text-xl font-semibold">테이블 완료</Button>
      )}
    </>
  );
}

export default PosTablesDetailCheckoutSideComp;
