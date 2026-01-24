import { api } from "@renderer/api";
import { Dialog } from "@renderer/components/Dialog";
import { ColorName } from "@renderer/constants/ui";
import { kscatApproval, paymentMethod, paymentType } from "@renderer/modules/kscat";
import { OrderPayment, Store } from "@renderer/types/domain";
import { KSCATApprovalResponse } from "@renderer/types/modules";
import { ModalProps } from "@renderer/types/overlay";
import { handleApiError } from "@renderer/utils/handle-api-error";

interface PosPaymentsCancelPayModalCompProps extends ModalProps {
  store: Store;
  payment: OrderPayment;
  setSelectedPayment: React.Dispatch<React.SetStateAction<OrderPayment | null>>;
  setFetchCount: React.Dispatch<React.SetStateAction<number>>;
}

function PosPaymentsCancelPayModalComp({
  store,
  payment,
  setSelectedPayment,
  setFetchCount,
  ...props
}: Readonly<PosPaymentsCancelPayModalCompProps>) {
  const cancelPayment = async (response?: KSCATApprovalResponse) => {
    try {
      await api.post(`/orders/payments/${payment.orderPaymentId}/cancel`, {
        approvalNo: response?.approvalNo ?? "",
        tradeTime: response?.tradeTime ?? "",
        tradeUniqueNo: response?.tradeUniqueNo ?? "",
      });
      setFetchCount((count) => count + 1);
      setSelectedPayment(null);
      props.close();
    } catch (error) {
      handleApiError(error as Error);
    }
  };

  const handlePayment = async () => {
    if (payment.method === "CARD") {
      await kscatApproval({
        deviceNo: store.setting.ksnetDeviceNo,
        method: paymentMethod.CARD,
        type: paymentType.CANCEL,
        amount: payment.amount,
        installment: payment.installment,
        successCallback: cancelPayment,
        approvalNo: payment.approvalNo,
        approvalDate: payment.tradeTime,
      });
    }

    if (payment.method === "CASH" && payment.cashReceiptType !== "NONE") {
      await kscatApproval({
        deviceNo: store.setting.ksnetDeviceNo,
        method: paymentMethod.CASH,
        type: paymentType.CANCEL,
        amount: payment.amount,
        installment: payment.cashReceiptType === "DEDUCTION" ? "10" : "11",
        successCallback: cancelPayment,
        approvalNo: payment.approvalNo,
        approvalDate: payment.tradeTime,
      });
    }

    if (payment.method === "CASH" && payment.cashReceiptType === "NONE") {
      await cancelPayment();
    }
  };

  const handleCancelPayment = () => {
    if (!payment.cancellable) {
      return;
    }

    handlePayment();
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper gap={32}>
        <div className="flex flex-col items-center justify-center gap-3 py-6">
          <span className="text-primary text-[28px] font-semibold">
            {payment.amount.toLocaleString()} 원
          </span>
          <span className="text-gray-0 text-xl font-semibold">결제를 취소하시겠습니까?</span>
        </div>
        <Dialog.Footer
          buttonSize="xl"
          primaryButton={{
            color: ColorName.PRIMARY,
            text: "취소하기",
            onClick: handleCancelPayment,
          }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosPaymentsCancelPayModalComp;
