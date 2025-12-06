import { Button } from "@renderer/components";
import { ColorName } from "@renderer/constants";
import PosPaymentsCancelPayModalComp from "@renderer/pages/pos/payments/PosPaymentsCancelPayModalComp";
import PosPaymentsOrderBoxComp from "@renderer/pages/pos/payments/PosPaymentsOrderBoxComp";
import PosPaymentsOrderIncludeModalComp from "@renderer/pages/pos/payments/PosPaymentsOrderIncludeModalComp";
import { Store, TableActivity } from "@renderer/types/domain";
import cn from "@renderer/utils/cn";
import { overlay } from "overlay-kit";

interface PosPaymentsSideCompProps {
  store: Store;
  activity: TableActivity;
}

function PosPaymentsSideComp({ store, activity }: PosPaymentsSideCompProps) {
  return (
    <aside
      className="sticky top-0 right-0 flex h-[calc(100dvh-133px)] flex-[0.3375] flex-col gap-8 overflow-y-hidden rounded-tl-[40px] rounded-bl-[40px] px-8 pt-10 pb-8"
      style={{ boxShadow: "-2px 0px 20px 0px rgba(0, 0, 0, 0.08)" }}
    >
      <header className="flex items-center gap-4">
        <span
          className={cn(
            "h-12 rounded-[80px] border-none px-5 py-3",
            activity.posTableActivityId
              ? "bg-primary/8 text-primary"
              : "bg-gray-700 text-xl font-medium text-gray-300"
          )}
        >
          {activity.posTableActivityId ?? "-"}
        </span>
        <h2 className="text-gray-0 text-[28px] font-bold">주문 내역</h2>
      </header>
      <section className="flex h-[calc(100%-8px-8px-24px-62px)] flex-col gap-4 overflow-y-auto">
        {activity.orders.map((order, index, arr) => (
          <article key={order.orderId}>
            <PosPaymentsOrderBoxComp>
              <PosPaymentsOrderBoxComp.Index index={index} />
              {order.orderMenus.map((menu) => (
                <PosPaymentsOrderBoxComp.Order key={menu.orderMenuId} orderMenu={menu} />
              ))}
              {index !== arr.length - 1 && <PosPaymentsOrderBoxComp.Divider />}
            </PosPaymentsOrderBoxComp>
          </article>
        ))}
      </section>
      <footer className="flex h-16 items-center gap-3">
        <Button
          variant="outline"
          color={activity.posTableActivityId ? ColorName.BLACK : ColorName.GREY}
          className={cn(
            "h-full w-fit rounded-xl px-8 font-semibold",
            activity.posTableActivityId ? "text-gray-200" : "border-gray-500 text-gray-500"
          )}
          disabled={!activity.posTableActivityId}
          onClick={() =>
            overlay.open((overlayProps) => (
              <PosPaymentsCancelPayModalComp price={activity.totalOrderPrice} {...overlayProps} />
            ))
          }
        >
          결제 취소하기
        </Button>
        <Button
          color={ColorName.BLACK}
          className={cn(
            "h-full w-full rounded-xl px-8 font-semibold text-white",
            activity.posTableActivityId ? "bg-gray-0" : "bg-gray-500"
          )}
          disabled={!activity.posTableActivityId}
          onClick={() =>
            overlay.open((overlayProps) => (
              <PosPaymentsOrderIncludeModalComp
                store={store}
                activity={activity}
                {...overlayProps}
              />
            ))
          }
        >
          영수증 출력하기
        </Button>
      </footer>
    </aside>
  );
}

export default PosPaymentsSideComp;
