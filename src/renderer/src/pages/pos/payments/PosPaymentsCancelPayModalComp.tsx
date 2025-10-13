import { Dialog } from "@renderer/components/Dialog";

function PosPaymentsCancelPayModalComp() {
  return (
    <Dialog open={true}>
      <Dialog.Wrapper gap={32}>
        <div className="flex flex-col items-center justify-center gap-3 py-6">
          <span className="text-primary text-[28px] font-semibold">
            {(72000).toLocaleString()} 원
          </span>
          <span className="text-gray-0 text-xl font-semibold">결제를 취소하시겠습니까?</span>
        </div>
        <Dialog.Footer buttonSize="xl" primaryButton={{ color: "primary", text: "취소하기" }} />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosPaymentsCancelPayModalComp;
