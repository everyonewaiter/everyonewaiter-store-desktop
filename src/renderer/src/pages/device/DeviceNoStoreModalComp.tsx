import { Dialog } from "@renderer/components/Dialog";
import { ColorName } from "@renderer/constants/ui";
import { ModalProps } from "@renderer/types/overlay";

interface DeviceNoStoreModalCompProps extends ModalProps {
  resetForm: () => void;
}

function DeviceNoStoreModalComp({ ...props }: DeviceNoStoreModalCompProps) {
  const handleClose = () => {
    props.resetForm();
    props.close();
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={handleClose}>
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
