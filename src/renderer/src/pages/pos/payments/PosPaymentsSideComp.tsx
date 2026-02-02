import { useEffect, useState } from "react";
import { api } from "@renderer/api";
import Button from "@renderer/components/Button/Button";
import { ColorName } from "@renderer/constants/ui";
import PosPaymentsCancelPayModalComp from "@renderer/pages/pos/payments/PosPaymentsCancelPayModalComp";
import PosPaymentsCashReceiptModalComp from "@renderer/pages/pos/payments/PosPaymentsCashReceiptModalComp";
import PosPaymentsOrderBoxComp from "@renderer/pages/pos/payments/PosPaymentsOrderBoxComp";
import PosPaymentsOrderIncludeModalComp from "@renderer/pages/pos/payments/PosPaymentsOrderIncludeModalComp";
import PosTablesDetailPaymentModalComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailPaymentModalComp";
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
}: Readonly<PosPaymentsSideCompProps>) {
  const [activity, setActivity] = useState<TableActivity | null>(null);

  useEffect(() => {
    const fetchActivity = () => {
      api
        .get(`/pos/tables/activities/${payment.posTableActivityId}`)
        .then(({ data }) => setActivity(data));
    };

    fetchActivity();
  }, [payment]);

  const handleCancelPayment = () => {
    if (!activity) return;
    overlay.open((overlayProps) => (
      <PosPaymentsCancelPayModalComp
        store={store}
        activity={activity}
        payment={payment}
        setSelectedPayment={setSelectedPayment}
        setFetchCount={setFetchCount}
        {...overlayProps}
      />
    ));
  };

  const handlePrintReceipt = () => {
    if (!activity) return;
    overlay.open((overlayProps) => (
      <PosPaymentsOrderIncludeModalComp store={store} activity={activity} {...overlayProps} />
    ));
  };

  /**
   * 재결제 모달 오픈
   */
  const handleRepayment = (paymentType: "cash" | "card") => {
    if (!activity) return;
    overlay.open((overlayProps) => (
      <PosTablesDetailPaymentModalComp
        activity={activity}
        isRepayment
        paymentType={paymentType}
        {...overlayProps}
      />
    ));
  };

  /**
   * 현금 결제 후 현금영수증 발급
   */
  const handlePrintCashReceiptAfterPayCash = async () => {
    if (!activity) return;
    overlay.open((overlayProps) => (
      <PosPaymentsCashReceiptModalComp activity={activity} payment={payment} {...overlayProps} />
    ));
  };

  return (
    <aside
      className="sticky top-0 right-0 flex h-[calc(100dvh-133px)] flex-[0.3375] flex-col gap-8 overflow-y-hidden rounded-tl-[40px] rounded-bl-[40px] px-8 pt-10 pb-8"
      style={{ boxShadow: "-2px 0px 20px 0px rgba(0, 0, 0, 0.08)" }}
    >
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
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
        </div>
        {payment?.method === "CASH" && payment?.cancellable && !payment?.cashReceiptNo && (
          <Button
            color={ColorName.PRIMARY}
            variant="outline"
            responsive
            responsiveButtons={{
              sm: { buttonSize: "md" },
              md: { buttonSize: "md" },
              lg: { buttonSize: "lg" },
            }}
            onClick={handlePrintCashReceiptAfterPayCash}
          >
            현금영수증 발급
          </Button>
        )}
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
        {payment?.cancellable && (
          <Button
            variant="outline"
            color={payment.posTableActivityId ? ColorName.BLACK : ColorName.GREY}
            className="h-full w-fit rounded-xl px-8 font-semibold"
            disabled={!payment.posTableActivityId}
            onClick={handleCancelPayment}
          >
            결제 취소하기
          </Button>
        )}
        {!payment?.cancellable &&
          payment.state === "CANCEL" &&
          activity &&
          activity.remainingPaymentPrice > 0 && (
            <>
              <Button
                variant="outline"
                color={ColorName.BLACK}
                className="h-full w-fit rounded-xl px-8 font-semibold text-gray-200"
                onClick={() => handleRepayment("cash")}
              >
                현금 재결제
              </Button>
              <Button
                variant="outline"
                color={ColorName.BLACK}
                className="h-full w-fit rounded-xl px-8 font-semibold text-gray-200"
                onClick={() => handleRepayment("card")}
              >
                카드 재결제
              </Button>
            </>
          )}
        <Button
          color={ColorName.BLACK}
          className="bg-gray-0 h-full w-full rounded-xl px-8 font-semibold text-white"
          disabled={!payment.posTableActivityId}
          onClick={handlePrintReceipt}
        >
          영수증 출력하기
        </Button>
      </footer>
    </aside>
  );
}

export default PosPaymentsSideComp;
