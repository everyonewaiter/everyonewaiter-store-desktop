import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@renderer/api";
import Button from "@renderer/components/Button/Button";
import { Dialog } from "@renderer/components/Dialog";
import { useGetDevice } from "@renderer/hooks/useGetDevice";
import { useGetStore } from "@renderer/hooks/useGetStore";
import { kscatApproval, paymentMethod } from "@renderer/modules/kscat";
import { OrderPayment, OrderReceiptType, TableActivity } from "@renderer/types/domain";
import { ModalProps } from "@renderer/types/overlay";
import cn from "@renderer/utils/cn";
import { ApiErrorResponse, handleError } from "@renderer/utils/handle-api-error";
import { PaymentSchema, paymentSchema } from "@renderer/utils/posSchema";
import { isAxiosError } from "axios";

const cashReceiptTypes: { label: string; value: OrderReceiptType }[] = [
  {
    label: "개인소득공제용",
    value: "DEDUCTION",
  },
  {
    label: "사업자증빙용",
    value: "PROOF",
  },
];

interface PosPaymentsCashReceiptModalCompProps extends ModalProps {
  activity: TableActivity;
  payment: OrderPayment;
}

function PosPaymentsCashReceiptModalComp({
  activity,
  payment,
  ...props
}: Readonly<PosPaymentsCashReceiptModalCompProps>) {
  const [isPending, setIsPending] = useState(false);

  const { device } = useGetDevice();
  const { store } = useGetStore(device?.storeId ?? "");

  const form = useForm<PaymentSchema>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentAmount: String(activity.remainingPaymentPrice),
      cashReceiptType: "DEDUCTION",
    },
  });

  const cashReceiptType = useWatch({ control: form.control, name: "cashReceiptType" });

  if (!store) return null;

  const handleIssueCashReceipt = async () => {
    try {
      setIsPending(true);

      await kscatApproval({
        deviceNo: store.setting.ksnetDeviceNo,
        method: paymentMethod.CASH,
        type: "0200",
        amount: Number.parseInt(form.watch("paymentAmount")),
        installment: cashReceiptType === "DEDUCTION" ? "00" : "01",
        successCallback: async (response) => {
          await api.post(
            `/orders/payments/${activity?.tableNo}/${payment.orderPaymentId}/issue-cash-receipt`,
            {
              approvalNo: response.approvalNo,
              tradeTime: response.tradeTime,
              tradeUniqueNo: response.tradeUniqueNo,
              cashReceiptNo: response?.cardNo ?? "",
              cashReceiptType: cashReceiptType,
            }
          );
          props.close();
        },
      });
    } catch (error) {
      if (isAxiosError<ApiErrorResponse>(error)) {
        handleError(error.response?.data?.message ?? "알 수 없는 오류가 발생했습니다.");
      } else {
        handleError((error as Error).message);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper width={648}>
        <div className="flex flex-col gap-10">
          <h2 className="text-gray-0 text-2xl font-semibold">현금영수증 발행</h2>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-gray-0 text-[15px] font-normal">결제할 금액</span>
              <h3 className="text-gray-0 text-2xl font-semibold">
                {activity.remainingPaymentPrice.toLocaleString()} 원
              </h3>
            </div>
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
                      cashReceiptType === receiptType.value ? "border-primary text-primary" : ""
                    )}
                    onClick={() => form.setValue("cashReceiptType", receiptType.value)}
                  >
                    {receiptType.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Dialog.Footer
          buttonSize="md"
          primaryButton={{
            text: `현금영수증 처리하기`,
            className: "w-full h-14 rounded-xl bg-gray-0 text-lg !font-semibold",
            onClick: () => handleIssueCashReceipt(),
            disabled: isPending,
          }}
          secondaryButton={{ hide: true }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosPaymentsCashReceiptModalComp;
