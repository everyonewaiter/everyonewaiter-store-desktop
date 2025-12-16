import { Dialog } from "@renderer/components/Dialog";
import { ModalProps } from "@renderer/types/overlay";
import { getFormattedTableNo } from "@renderer/utils/format";

interface PosTablesDetailCancelPaymentModalCompProps extends ModalProps {
  tableNo: number;
  cancelOrderPrice: number;
}

function PosTablesDetailCancelPaymentModalComp({
  tableNo,
  cancelOrderPrice,
  ...props
}: PosTablesDetailCancelPaymentModalCompProps) {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper>
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between rounded-xl border border-gray-600 p-6 py-4">
            <span className="text-gray-0 text-2xl font-semibold">
              {getFormattedTableNo(tableNo)}
            </span>
            <span className="text-primary text-3xl font-bold">
              {cancelOrderPrice.toLocaleString()}
            </span>
          </div>
          <span className="text-gray-0 text-center text-xl font-normal">
            결제를 취소하시겠습니까?
          </span>
        </div>
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosTablesDetailCancelPaymentModalComp;
