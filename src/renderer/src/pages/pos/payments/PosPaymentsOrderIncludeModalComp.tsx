import { Dialog } from "@renderer/components/Dialog";
import { ColorName } from "@renderer/constants";
import { ModalProps } from "@renderer/types/overlay";

function PosPaymentsOrderIncludeModalComp({ ...props }: ModalProps) {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper gap={32}>
        <div className="flex flex-col items-center justify-center gap-3 py-6">
          <span className="text-gray-0 text-xl font-semibold">영수증 출력</span>
          <span className="text-lg font-normal text-gray-200">주문내역을 포함할까요?</span>
        </div>
        <Dialog.Footer
          buttonSize="xl"
          secondaryButton={{ color: ColorName.BLACK, text: "미포함" }}
          primaryButton={{ color: ColorName.PRIMARY, text: "포함" }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosPaymentsOrderIncludeModalComp;
