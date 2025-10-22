import { Button } from "@renderer/components";
import PosPaymentsOrderBoxComp from "@renderer/pages/pos/payments/PosPaymentsOrderBoxComp";
import PosTablesDetailCancelPaymentModalComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailCancelPaymentModalComp";
import PosTablesDetailDiscountModalComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailDiscountModalComp";
import PosTablesDetailOrderModalComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailOrderModalComp";
import PosTablesDetailPaymentModalComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailPaymentModalComp";
import { Menu, TableActivity } from "@renderer/types/domain";
import { overlay } from "overlay-kit";

interface PosTablesDetailSideCompProps {
  type?: "order" | "checkout";
  activity: TableActivity;
  menus: Menu[];
}

function PosTablesDetailSideComp({
  type = "checkout",
  activity,
  menus,
}: PosTablesDetailSideCompProps) {
  return (
    <aside
      className="sticky top-0 right-0 flex h-dvh flex-[0.3375] flex-col gap-8 overflow-y-hidden rounded-tl-[40px] rounded-bl-[40px] pt-10 pr-4 pb-8 pl-8"
      style={{ boxShadow: "-2px 0px 20px 0px rgba(0, 0, 0, 0.08)" }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-gray-0 text-[28px] font-semibold">
          {activity.tableNo}번 테이블 {type === "order" && "주문 내역"}
        </h2>
        {type === "checkout" && activity.orderType === "PREPAID" && (
          <Button
            variant="outline"
            className="button-lg !text-medium !rounded-[8px] !text-base"
            onClick={() =>
              overlay.open((overlayProps) => (
                <PosTablesDetailCancelPaymentModalComp {...overlayProps} />
              ))
            }
          >
            결제 취소
          </Button>
        )}
      </div>
      <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto pr-4">
        <div className="flex w-full flex-col gap-8">
          {type === "checkout" &&
            activity.orders.map((order, index) => (
              <PosPaymentsOrderBoxComp key={order.orderId}>
                <PosPaymentsOrderBoxComp.Index index={index} hasCheckbox />
                {order.orderMenus.map((menu) => (
                  <PosPaymentsOrderBoxComp.Order key={menu.orderMenuId} orderMenu={menu} />
                ))}
              </PosPaymentsOrderBoxComp>
            ))}
        </div>
        <div className="flex w-full flex-col gap-2">
          {type === "order" &&
            menus.map((menu) => (
              <PosPaymentsOrderBoxComp key={menu.menuId}>
                <PosPaymentsOrderBoxComp.Order
                  key={menu.menuId}
                  orderMenu={{ ...menu, quantity: 1 }}
                />
              </PosPaymentsOrderBoxComp>
            ))}
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
                  <PosTablesDetailDiscountModalComp {...overlayProps} />
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
                  {(30000).toLocaleString()}원
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex-1 text-lg font-normal text-gray-300">할인된 금액</span>
                <span className="text-primary text-xl font-medium">
                  {(17000).toLocaleString()}원
                </span>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-gray-0 text-2xl font-semibold">결제할 금액</span>
            <span className="text-gray-0 text-4xl font-bold">{(13000).toLocaleString()}원</span>
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
      {type === "checkout" && activity.orderType === "POSTPAID" && (
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-16 w-full rounded-xl border !border-gray-200 text-xl font-semibold text-gray-200"
            onClick={() =>
              overlay.open((overlayProps) => (
                <PosTablesDetailPaymentModalComp paymentType="cash" {...overlayProps} />
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
                <PosTablesDetailPaymentModalComp paymentType="card" {...overlayProps} />
              ))
            }
          >
            카드 결제
          </Button>
        </div>
      )}
      {(type === "checkout" &&
        activity.orderType === "POSTPAID" &&
        activity.remainingPaymentPrice === 0) ||
        (activity.orderType === "PREPAID" && (
          <Button className="h-16 w-full rounded-xl text-xl font-semibold">테이블 완료</Button>
        ))}
    </aside>
  );
}

export default PosTablesDetailSideComp;
