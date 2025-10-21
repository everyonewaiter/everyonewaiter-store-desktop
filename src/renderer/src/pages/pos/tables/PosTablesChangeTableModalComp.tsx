import { DoubleArrowIcon } from "@renderer/assets/icons";
import { Dialog } from "@renderer/components/Dialog";
import { ModalProps } from "@renderer/types/overlay";

interface PosTablesChangeTableModalCompProps extends ModalProps {
  fromTableNo: number;
  toTableNo: number;
}

function PosTablesChangeTableModalComp({
  fromTableNo,
  toTableNo,
  ...props
}: PosTablesChangeTableModalCompProps) {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper gap={32}>
        <div className="flex items-center gap-3">
          <div className="text-gray-0 h-20 flex-1 rounded-2xl border border-gray-600 p-6 text-center text-xl font-semibold">
            {fromTableNo}번 테이블
          </div>
          <DoubleArrowIcon className="size-6" />
          <div className="text-gray-0 border-primary h-20 flex-1 rounded-2xl border p-6 text-center text-xl font-semibold">
            {toTableNo}번 테이블
          </div>
        </div>
        <div className="flex flex-col gap-3 text-center">
          <span className="text-lg font-normal text-gray-100">
            <span className="text-0 text-xl font-medium">{fromTableNo}번 테이블</span>에서{" "}
            <span className="text-primary text-xl font-medium">{toTableNo}번 테이블</span>로
            이동합니다.
          </span>
          <span className="text-0 text-xl font-semibold">좌석 이동하시겠습니까?</span>
        </div>
        <Dialog.Footer buttonSize="xl" primaryButton={{ text: "이동하기" }} />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosTablesChangeTableModalComp;
