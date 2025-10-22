import { Dialog } from "@renderer/components/Dialog";
import { ModalProps } from "@renderer/types/overlay";

interface PosTablesDetailOrderModalCompProps extends ModalProps {}

export default function PosTablesDetailOrderModalComp({
  ...props
}: PosTablesDetailOrderModalCompProps) {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper>
        <div className="flex flex-col gap-5">
          <h2 className="text-gray-0 text-center text-xl font-semibold">주문하시겠습니까?</h2>
          <textarea
            className="placholder:text-gray-100 text-gray-0 h-30 w-full resize-none rounded-xl border border-gray-600 px-4 pt-3 pb-4 text-base font-medium outline-none"
            placeholder="주문 관련 메모 작성"
          />
        </div>
        <Dialog.Footer buttonSize="xl" primaryButton={{ text: "주문하기", onClick: () => {} }} />
      </Dialog.Wrapper>
    </Dialog>
  );
}
