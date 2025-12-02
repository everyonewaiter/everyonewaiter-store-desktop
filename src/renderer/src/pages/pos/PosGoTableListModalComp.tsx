import { Dialog } from "@renderer/components/Dialog";
import { useControlStoreStatus } from "@renderer/queries/useControlStoreStatus";
import { ModalProps } from "@renderer/types/overlay";

interface PosGoTableListModalCompProps extends ModalProps {
  onClick: () => void;
}

function PosGoTableListModalComp({ onClick, ...props }: PosGoTableListModalCompProps) {
  const { openStore } = useControlStoreStatus();

  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper>
        <div className="text-gray-0 flex items-center justify-center py-6 text-xl font-semibold">
          매장을 오픈하시겠습니까?
        </div>
        <Dialog.Footer
          primaryButton={{
            color: "primary",
            text: "매장 열기",
            onClick: async () => {
              await openStore.mutateAsync();
              onClick();
              props.close();
            },
          }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosGoTableListModalComp;
