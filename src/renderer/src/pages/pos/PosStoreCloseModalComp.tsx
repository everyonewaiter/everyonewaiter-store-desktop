import { Dialog } from "@renderer/components/Dialog";
import { useControlStoreStatus } from "@renderer/queries/useControlStoreStatus";
import { ModalProps } from "@renderer/types/overlay";

interface PosStoreCloseModalCompProps extends ModalProps {
  onSuccess: () => void;
}

function PosStoreCloseModalComp({ onSuccess, ...props }: PosStoreCloseModalCompProps) {
  const { closeStore } = useControlStoreStatus();

  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper>
        <div className="text-gray-0 flex items-center justify-center py-6 text-xl font-semibold">
          매장을 마감하시겠습니까?
        </div>
        <Dialog.Footer
          layout="balanced"
          primaryButton={{
            color: "primary",
            text: "마감하기",
            onClick: async () => {
              await closeStore.mutateAsync();
              props.close();
              onSuccess();
            },
          }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosStoreCloseModalComp;
