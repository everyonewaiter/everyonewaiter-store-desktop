import { Dialog } from "@renderer/components/Dialog";
import { ColorName } from "@renderer/constants";

function PosPaymentsPrintReceiptModalComp() {
  return (
    <Dialog open={true}>
      <Dialog.Wrapper gap={32}>
        <div className="flex flex-col items-center justify-center gap-2.5 py-6">
          <span className="text-gray-0 text-xl font-semibold">영수증을 출력하시겠습니까?</span>
          <span className="text-lg font-normal text-gray-200">주문내역이 포함되어있어요.</span>
        </div>
        <Dialog.Footer
          buttonSize="xl"
          primaryButton={{ color: ColorName.PRIMARY, text: "출력하기" }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosPaymentsPrintReceiptModalComp;
