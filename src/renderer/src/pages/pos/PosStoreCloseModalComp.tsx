import { Dialog } from "@renderer/components/Dialog";

interface PosStoreCloseModalCompProps {
  type: "open" | "cancel";
}

function PosStoreCloseModalComp({ type }: PosStoreCloseModalCompProps) {
  const statusText = type === "open" ? "오픈" : "마감";

  return (
    <Dialog open={true}>
      <Dialog.Wrapper>
        <div className="text-gray-0 flex items-center justify-center py-6 text-xl font-semibold">
          매장을 {statusText}하시겠습니까?
        </div>
        <Dialog.Footer
          className="mt-2"
          layout="balanced"
          buttonClassName="button-xl"
          primaryButton={{
            color: "primary",
            text: `${statusText}하기`,
          }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosStoreCloseModalComp;
