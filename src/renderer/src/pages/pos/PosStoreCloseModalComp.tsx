import { Dialog } from "@renderer/components/Dialog";
import { useControlStoreStatus } from "@renderer/hooks/useControlStoreStatus";
import { useGetDevice } from "@renderer/hooks/useGetDevice";
import { useGetStore } from "@renderer/hooks/useGetStore";
import { ModalProps } from "@renderer/types/overlay";

interface PosStoreCloseModalCompProps extends ModalProps {
  onSuccess?: () => void;
}

function PosStoreCloseModalComp({ onSuccess, ...props }: PosStoreCloseModalCompProps) {
  const { device } = useGetDevice();
  const { store } = useGetStore(device?.storeId ?? "");
  const { openStore, closeStore } = useControlStoreStatus();

  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper>
        <div className="text-gray-0 flex items-center justify-center py-6 text-xl font-semibold">
          매장을 {store?.status === "CLOSE" ? "오픈" : "마감"}하시겠습니까?
        </div>
        <Dialog.Footer
          layout="balanced"
          primaryButton={{
            color: "primary",
            text: store?.status === "CLOSE" ? "오픈하기" : "마감하기",
            onClick: async () => {
              if (store?.status === "CLOSE") {
                await openStore.mutateAsync();
              } else {
                await closeStore.mutateAsync();
              }
              props.close();
              onSuccess?.();
            },
          }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosStoreCloseModalComp;
