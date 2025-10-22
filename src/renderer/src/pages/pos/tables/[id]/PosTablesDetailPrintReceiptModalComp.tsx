import { Dialog } from "@renderer/components/Dialog";
import { ModalProps } from "@renderer/types/overlay";

interface PosTablesDetailPrintReceiptModalCompProps extends ModalProps {}

export default function PosTablesDetailPrintReceiptModalComp({
  ...props
}: PosTablesDetailPrintReceiptModalCompProps) {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper>
        <div className="text-gray-0 flex items-center justify-center py-6 text-xl font-semibold">
          영수증을 출력하시겠습니까?
        </div>
        <Dialog.Footer buttonSize="xl" primaryButton={{ text: "출력하기" }} />
      </Dialog.Wrapper>
    </Dialog>
  );
}
