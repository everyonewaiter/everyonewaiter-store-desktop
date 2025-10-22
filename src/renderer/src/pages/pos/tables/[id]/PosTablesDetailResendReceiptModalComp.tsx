import { Dialog } from "@renderer/components/Dialog";
import { ModalProps } from "@renderer/types/overlay";

interface PosTablesDetailResendReceiptModalCompProps extends ModalProps {}

export default function PosTablesDetailResendReceiptModalComp({
  ...props
}: PosTablesDetailResendReceiptModalCompProps) {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper>
        <div className="flex flex-col items-center justify-center gap-3 py-6">
          <h2 className="text-primary text-center text-[28px] font-semibold">2번 테이블 주문</h2>
          <span className="text-gray-0 text-lg font-normal">영수증을 재전송할까요?</span>
        </div>
        <Dialog.Footer buttonSize="xl" primaryButton={{ text: "재전송하기" }} />
      </Dialog.Wrapper>
    </Dialog>
  );
}
