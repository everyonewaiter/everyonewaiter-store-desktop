import { useEffect, useState } from "react";
import { api } from "@renderer/api";
import Button from "@renderer/components/Button/Button";
import { ColorName } from "@renderer/constants/ui";
import PosPaymentsCancelPayModalComp from "@renderer/pages/pos/payments/PosPaymentsCancelPayModalComp";
import PosPaymentsOrderBoxComp from "@renderer/pages/pos/payments/PosPaymentsOrderBoxComp";
import PosPaymentsOrderIncludeModalComp from "@renderer/pages/pos/payments/PosPaymentsOrderIncludeModalComp";
import { OrderPayment, Store, TableActivity } from "@renderer/types/domain";
import cn from "@renderer/utils/cn";
import { overlay } from "overlay-kit";

interface PosPaymentsSideCompProps {
  store: Store;
  payment: OrderPayment;
  setSelectedPayment: React.Dispatch<React.SetStateAction<OrderPayment | null>>;
  setFetchCount: React.Dispatch<React.SetStateAction<number>>;
}

function PosPaymentsSideComp({
  store,
  payment,
  setSelectedPayment,
  setFetchCount,
}: PosPaymentsSideCompProps) {
  const [activity, setActivity] = useState<TableActivity | null>(null);

  useEffect(() => {
    const fetchActivity = () => {
      api
        .get(`/pos/tables/activities/${payment.posTableActivityId}`)
        .then(({ data }) => setActivity(data));
    };

    fetchActivity();
  }, [payment]);

  return (
    <aside
      className="sticky top-0 right-0 flex h-[calc(100dvh-133px)] flex-[0.3375] flex-col gap-8 overflow-y-hidden rounded-tl-[40px] rounded-bl-[40px] px-8 pt-10 pb-8"
      style={{ boxShadow: "-2px 0px 20px 0px rgba(0, 0, 0, 0.08)" }}
    >
      <header className="flex items-center gap-4">
        <span
          className={cn(
            "h-12 rounded-[80px] border-none px-5 py-3",
            payment.posTableActivityId
              ? "bg-primary/8 text-primary"
              : "bg-gray-700 text-xl font-medium text-gray-300"
          )}
        >
          {payment.posTableActivityId ?? "-"}
        </span>
        <h2 className="text-gray-0 text-[28px] font-bold">주문 내역</h2>
      </header>
      <section className="flex h-[calc(100%-8px-8px-24px-62px)] flex-col gap-4 overflow-y-auto">
        {activity?.orders.map((order, index, arr) => (
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
        {payment.cancellable && (
          <Button
            variant="outline"
            color={payment.posTableActivityId ? ColorName.BLACK : ColorName.GREY}
            className={cn(
              "h-full w-fit rounded-xl px-8 font-semibold",
              payment.posTableActivityId ? "text-gray-200" : "border-gray-500 text-gray-500"
            )}
            disabled={!payment.posTableActivityId || !activity || !payment.cancellable}
            onClick={() =>
              overlay.open((overlayProps) => (
                <PosPaymentsCancelPayModalComp
                  store={store}
                  payment={payment}
                  setSelectedPayment={setSelectedPayment}
                  setFetchCount={setFetchCount}
                  {...overlayProps}
                />
              ))
            }
          >
            결제 취소하기
          </Button>
        )}
        {activity && (
          <Button
            color={ColorName.BLACK}
            className={cn(
              "h-full w-full rounded-xl px-8 font-semibold text-white",
              payment.posTableActivityId ? "bg-gray-0" : "bg-gray-500"
            )}
            disabled={!payment.posTableActivityId}
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
        )}
      </footer>
    </aside>
  );
}

export default PosPaymentsSideComp;
