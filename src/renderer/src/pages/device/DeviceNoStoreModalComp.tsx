import { Dialog } from "@renderer/components/Dialog";
import { ColorName } from "@renderer/constants";
import { ModalProps } from "@renderer/types/overlay";

interface DeviceNoStoreModalCompProps extends ModalProps {}

function DeviceNoStoreModalComp({ ...props }: DeviceNoStoreModalCompProps) {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper gap={32}>
        <Dialog.Title>
          <h2 className="text-gray-0 text-center text-xl font-semibold whitespace-pre-line">{`등록된 매장이 없습니다.\n매장을 먼저 등록해주세요!`}</h2>
        </Dialog.Title>
        <Dialog.Footer
          buttonSize="xl"
          primaryButton={{ hide: true }}
          secondaryButton={{ color: ColorName.PRIMARY, text: "확인" }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default DeviceNoStoreModalComp;
