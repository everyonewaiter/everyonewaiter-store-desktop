import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@renderer/api";
import Button from "@renderer/components/Button/Button";
import { Dialog } from "@renderer/components/Dialog";
import Dropdown from "@renderer/components/Dropdown";
import Input from "@renderer/components/Input";
import { useGetDevice } from "@renderer/hooks/useGetDevice";
import { useGetStore } from "@renderer/hooks/useGetStore";
import { calculateTax, kscatApproval, paymentMethod } from "@renderer/modules/kscat";
import PosTablesDetailPrintReceiptModalComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailPrintReceiptModalComp";
import { OrderPayment, OrderReceiptType, TableActivity } from "@renderer/types/domain";
import { KSCATApprovalResponse } from "@renderer/types/modules";
import { ModalProps } from "@renderer/types/overlay";
import cn from "@renderer/utils/cn";
import { formatPrice, getFormattedMenuName, getFormattedTableNo } from "@renderer/utils/format";
import { ApiErrorResponse, handleError } from "@renderer/utils/handle-api-error";
import { PaymentSchema, paymentSchema } from "@renderer/utils/posSchema";
import { isAxiosError } from "axios";
import { overlay } from "overlay-kit";

const cardInstallmentMonths = new Array(12)
  .fill(0)
  .map((_, i) =>
    i === 0 ? { name: "일시불", id: "0" } : { name: `${i + 1}개월`, id: String(i + 1) }
  );

const cashReceiptTypes: { label: string; value: OrderReceiptType }[] = [
  {
    label: "신청안함",
    value: "NONE",
  },
  {
    label: "개인소득공제용",
    value: "DEDUCTION",
  },
  {
    label: "사업자증빙용",
    value: "PROOF",
  },
];

interface PosTablesDetailPaymentModalCompProps extends ModalProps {
  paymentType: "cash" | "card";
  activity: TableActivity;
  isRepayment?: boolean;
  payment?: OrderPayment;
}

function PosTablesDetailPaymentModalComp({
  paymentType,
  activity,
  isRepayment = false,
  payment,
  ...props
}: Readonly<PosTablesDetailPaymentModalCompProps>) {
  const [isPending, setIsPending] = useState(false);

  const { device } = useGetDevice();
  const { store } = useGetStore(device?.storeId ?? "");

  const form = useForm<PaymentSchema>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentAmount: String(activity.remainingPaymentPrice),
      cashReceiptType: "NONE",
      installment: "0",
    },
  });

  if (!store) {
    return null;
  }

  /**
   * 재결제 로직
   */
  const repayPayment = async () => {
    const amount = Number.parseInt(form.watch("paymentAmount"));
    const { vat, supplyAmount } = calculateTax(amount);
    const canPrintReceipt = activity.remainingPaymentPrice === amount;

    await api.post(
      `/orders/payments/${activity.tableNo}/${activity.posTableActivityId}/repayment`,
      {
        method: paymentType.toUpperCase(),
        installment: form.watch("installment").padStart(2, "0"),
        cashReceiptType: form.watch("cashReceiptType"),
        amount,
        vat,
        supplyAmount,
        ...payment,
      }
    );

    if (canPrintReceipt) {
      overlay.open((overlayProps) => (
        <PosTablesDetailPrintReceiptModalComp
          posTableActivityId={activity.posTableActivityId}
          {...overlayProps}
        />
      ));
    }
  };

  const approvePayment = async (response?: KSCATApprovalResponse) => {
    const amount = Number.parseInt(form.watch("paymentAmount"));
    const { vat, supplyAmount } = calculateTax(amount);
    const canPrintReceipt = activity.remainingPaymentPrice === amount;

    await api.post(`/orders/payments/${activity.tableNo}/approve`, {
      method: paymentType === "cash" ? "CASH" : "CARD",
      amount,
      approvalNo: response?.approvalNo ?? "",
      installment: form.watch("installment").padStart(2, "0"),
      cardNo: response?.cardNo ?? "",
      issuerName: response?.issuerName ?? "",
      purchaseName: response?.purchaseName ?? "",
      merchantNo: response?.merchantNo ?? "",
      tradeTime: response?.tradeTime ?? "",
      tradeUniqueNo: response?.tradeUniqueNo ?? "",
      vat,
      supplyAmount,
      cashReceiptNo: response?.cardNo ?? "",
      cashReceiptType: form.watch("cashReceiptType"),
    });

    if (canPrintReceipt) {
      overlay.open((overlayProps) => (
        <PosTablesDetailPrintReceiptModalComp
          posTableActivityId={activity.posTableActivityId}
          {...overlayProps}
        />
      ));
    }
  };

  /**
   * 결제 로직 분리
   * @returns 결제 로직 실행
   */
  const runPaymentFlow = async () => {
    if (paymentType === "card") {
      await kscatApproval({
        deviceNo: store.setting.ksnetDeviceNo,
        method: paymentMethod.CARD,
        type: "0200",
        amount: Number.parseInt(form.watch("paymentAmount")),
        installment: form.watch("installment").padStart(2, "0"),
        successCallback: isRepayment ? repayPayment : approvePayment,
      });
      return;
    }
    const cashReceiptType = form.watch("cashReceiptType");
    if (cashReceiptType !== "NONE") {
      await kscatApproval({
        deviceNo: store.setting.ksnetDeviceNo,
        method: paymentMethod.CASH,
        type: "0200",
        amount: Number.parseInt(form.watch("paymentAmount")),
        installment: cashReceiptType === "DEDUCTION" ? "00" : "01",
        successCallback: isRepayment ? repayPayment : approvePayment,
      });
      return;
    }
    await (isRepayment ? repayPayment : approvePayment)();
  };

  const handlePaymentError = (error: unknown) => {
    if (isAxiosError<ApiErrorResponse>(error)) {
      handleError(error.response?.data?.message ?? "알 수 없는 오류가 발생했습니다.");
    } else {
      handleError((error as Error).message);
    }
  };

  const handlePayment = async () => {
    try {
      setIsPending(true);
      await runPaymentFlow();
    } catch (error) {
      handlePaymentError(error);
    } finally {
      setIsPending(false);
      props.close();
    }
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper width={648}>
        <div className="flex flex-col gap-10">
          <h2 className="text-gray-0 text-2xl font-semibold">
            {getFormattedTableNo(activity.tableNo)}
            {isRepayment && " 재결제"}
          </h2>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-gray-0 text-[15px] font-normal">결제 정보</span>
              <h3 className="text-gray-0 text-2xl font-semibold">
                {getFormattedMenuName(activity.orders.flatMap((order) => order.orderMenus))}
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-0 text-[15px] font-normal">결제할 금액</span>
              <div className="flex items-center gap-2">
                <Input
                  className="text-gray-0 text-lg! font-semibold"
                  value={
                    form.watch("paymentAmount")
                      ? Number(form.watch("paymentAmount")).toLocaleString()
                      : ""
                  }
                  onChange={(e) => {
                    const val = formatPrice(e.target.value, activity.remainingPaymentPrice);
                    if (val !== null) form.setValue("paymentAmount", val);
                  }}
                  placeholder={String(activity.remainingPaymentPrice.toLocaleString())}
                  fieldState={form.getFieldState("paymentAmount")}
                />
                <h3 className="text-gray-0 text-2xl font-semibold">원</h3>
              </div>
            </div>
            {paymentType === "cash" ? (
              <div className="flex flex-col gap-2">
                <span className="text-gray-0 text-[15px] font-normal">현금영수증 발행</span>
                <div className="flex items-center gap-3">
                  {cashReceiptTypes.map((receiptType) => (
                    <Button
                      key={receiptType.value}
                      variant="outline"
                      color="grey"
                      className={cn(
                        "button-lg flex-1 border border-gray-500 text-base font-medium! text-gray-200",
                        form.watch("cashReceiptType") === receiptType.value
                          ? "border-primary text-primary"
                          : ""
                      )}
                      onClick={() => form.setValue("cashReceiptType", receiptType.value)}
                    >
                      {receiptType.label}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <span className="text-gray-0 text-[15px] font-normal">할부 개월</span>
                <Dropdown
                  value={form.watch("installment")}
                  dropdownItems={cardInstallmentMonths}
                  defaultText={
                    cardInstallmentMonths.find((month) => month.id === form.watch("installment"))
                      ?.name || "일시불"
                  }
                  onChange={(e) => form.setValue("installment", e.id)}
                />
              </div>
            )}
          </div>
        </div>
        <Dialog.Footer
          buttonSize="custom"
          primaryButton={{
            text: `${paymentType === "cash" ? "현금" : "카드"} ${isRepayment ? "재" : ""}결제하기`,
            className: "w-full h-16 rounded-xl bg-gray-0 text-xl !font-semibold",
            onClick: handlePayment,
            disabled: isPending,
          }}
          secondaryButton={{ hide: true }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosTablesDetailPaymentModalComp;
