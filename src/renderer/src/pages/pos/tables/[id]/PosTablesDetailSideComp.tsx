import { Button } from "@renderer/components";
import OrderBox from "@renderer/pages/pos/payments/PosPaymentsOrderBoxComp";
import PosTablesDetailCancelPaymentModalComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailCancelPaymentModalComp";
import PosTablesDetailDiscountModalComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailDiscountModalComp";
import PosTablesDetailOrderModalComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailOrderModalComp";
import PosTablesDetailPaymentModalComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailPaymentModalComp";
import { useGetTableActivity } from "@renderer/pages/pos/tables/[id]/usePosTablesDetailApi";
import { usePosTablesDetailOrderStore } from "@renderer/pages/pos/tables/[id]/usePosTablesDetailOrderStore";
import { Order } from "@renderer/types/domain";
import { overlay } from "overlay-kit";

interface PosTablesDetailSideCompProps {
  type?: "order" | "checkout";
  tableNo: number;
}

function PosTablesDetailSideComp({ type = "checkout", tableNo }: PosTablesDetailSideCompProps) {
  const checkedOrders: Order[] = [];

  const { orders } = usePosTablesDetailOrderStore();
  const { data: activity } = useGetTableActivity(tableNo);

  return (
    <aside
      className="sticky top-0 right-0 flex h-dvh flex-[0.3375] flex-col gap-8 overflow-y-hidden rounded-tl-[40px] rounded-bl-[40px] pt-10 pr-4 pb-8 pl-8"
      style={{ boxShadow: "-2px 0px 20px 0px rgba(0, 0, 0, 0.08)" }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-gray-0 text-[28px] font-semibold">
          {tableNo}번 테이블 {type === "order" && "주문 내역"}
        </h2>
        {type === "checkout" && activity?.orderType === "PREPAID" && (
          <Button
            variant="outline"
            className="button-lg !text-medium !rounded-[8px] !text-base"
            onClick={() =>
              overlay.open((overlayProps) => (
                <PosTablesDetailCancelPaymentModalComp
                  tableNo={tableNo}
                  cancelOrderPrice={activity?.totalOrderPrice}
                  {...overlayProps}
                />
              ))
            }
          >
            결제 취소
          </Button>
        )}
        {type === "checkout" && activity?.orderType === "POSTPAID" && (
          <Button
            variant="outline"
            className="button-lg !text-medium !rounded-[8px] !text-base"
            onClick={() =>
              overlay.open((overlayProps) => (
                <PosTablesDetailCancelPaymentModalComp
                  tableNo={tableNo}
                  cancelOrderPrice={
                    checkedOrders.length > 0
                      ? checkedOrders.reduce((acc, order) => acc + order.price, 0)
                      : activity?.totalOrderPrice
                  }
                  {...overlayProps}
                />
              ))
            }
          >
            {checkedOrders.length > 0 ? "선택" : "전체"} 주문 취소
          </Button>
        )}
      </div>
      <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto">
        <div className="flex w-full flex-col gap-8">
          {type === "checkout" &&
            activity?.orders?.map((order, index) => (
              <OrderBox key={order.orderId}>
                <OrderBox.Index index={index} hasCheckbox />
                <OrderBox.Body>
                  {order.orderMenus.map((menu) => (
                    <OrderBox.Order key={menu.orderMenuId} orderMenu={menu} />
                  ))}
                </OrderBox.Body>
              </OrderBox>
            ))}
        </div>
        <div className="flex w-full flex-col gap-2">
          {type === "order" && orders && orders.length > 0 && (
            <OrderBox>
              <OrderBox.Body>
                {orders?.map((menu, index) => (
                  <OrderBox.Order key={menu.menuId} index={index} orderMenu={menu} />
                ))}
              </OrderBox.Body>
            </OrderBox>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="h-0.5 w-full bg-gray-600" />
        {type === "checkout" && (
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
          {type === "checkout" && (
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
          )}
          <div className="flex items-center justify-between">
            <span className="text-gray-0 text-2xl font-semibold">결제할 금액</span>
            <span className="text-gray-0 text-4xl font-bold">
              {type === "order"
                ? orders
                    ?.reduce((acc, cur) => acc + cur.totalPrice * cur.quantity, 0)
                    ?.toLocaleString()
                : (activity?.totalPaymentPrice?.toLocaleString() ?? 0)}
              원
            </span>
          </div>
        </div>
      </div>
      {type === "order" && (
        <Button
          className="h-16 w-full rounded-xl text-xl font-semibold"
          onClick={() =>
            overlay.open((overlayProps) => <PosTablesDetailOrderModalComp {...overlayProps} />)
          }
        >
          주문 요청
        </Button>
      )}
      {type === "checkout" && activity?.orderType === "POSTPAID" && (
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
      {(type === "checkout" &&
        activity?.orderType === "POSTPAID" &&
        activity?.remainingPaymentPrice === 0) ||
        (activity?.orderType === "PREPAID" && (
          <Button className="h-16 w-full rounded-xl text-xl font-semibold">테이블 완료</Button>
        ))}
    </aside>
  );
}

export default PosTablesDetailSideComp;
