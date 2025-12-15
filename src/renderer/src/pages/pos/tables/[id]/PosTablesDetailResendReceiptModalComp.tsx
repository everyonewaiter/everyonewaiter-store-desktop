import { api } from "@renderer/api";
import { Dialog } from "@renderer/components/Dialog";
import { ModalProps } from "@renderer/types/overlay";
import { getFormattedTableNo } from "@renderer/utils/format";
import { handleApiError } from "@renderer/utils/handle-api-error";

interface PosTablesDetailResendReceiptModalCompProps extends ModalProps {
  tableNo: number;
}

function PosTablesDetailResendReceiptModalComp({
  tableNo,
  ...props
}: PosTablesDetailResendReceiptModalCompProps) {
  const handleResendReceipt = async () => {
    try {
      await api.post(`/pos/tables/${tableNo}/resend-receipt`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleApiError(error);
      }
    }
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper>
        <div className="flex flex-col items-center justify-center gap-3 py-6">
          <h2 className="text-primary text-center text-[28px] font-semibold">
            {getFormattedTableNo(tableNo)}
          </h2>
          <span className="text-gray-0 text-lg font-normal">
            주문 빌지를 주방으로 재전송할까요?
          </span>
        </div>
        <Dialog.Footer
          buttonSize="xl"
          primaryButton={{
            text: "재전송하기",
            onClick: () => {
              handleResendReceipt();
              props.close();
            },
          }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosTablesDetailResendReceiptModalComp;
