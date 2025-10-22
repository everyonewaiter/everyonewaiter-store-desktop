import { useState } from "react";
import { Dialog } from "@renderer/components/Dialog";
import { ModalProps } from "@renderer/types/overlay";

interface PosTablesDetailMemoModalCompProps extends ModalProps {}

export default function PosTablesDetailMemoModalComp({
  ...props
}: PosTablesDetailMemoModalCompProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-0 text-center text-2xl font-semibold">메모</h2>
            <span className="text-gray-0 text-lg font-semibold">2번 테이블</span>
          </div>
          <div className="flex flex-col gap-[5px]">
            <span className="text-gray-0 text-lg font-semibold">1번 주문 메모</span>
            <textarea
              className="placholder:text-gray-100 text-gray-0 h-20 w-full resize-none rounded-xl border border-gray-600 px-4 pt-3 pb-4 text-base font-medium outline-none"
              readOnly
              placeholder="메모가 없습니다."
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <span className="text-gray-0 text-lg font-semibold">2번 주문 메모</span>
            <textarea
              className="placholder:text-gray-100 text-gray-0 h-20 w-full resize-none rounded-xl border border-gray-600 px-4 pt-3 pb-4 text-base font-medium outline-none"
              readOnly
              placeholder="메모가 없습니다."
            />
          </div>
        </div>
        <Dialog.Footer
          buttonSize="xl"
          primaryButton={{
            color: isEditing ? "primary" : "black",
            text: isEditing ? "저장" : "수정",
            onClick: () => setIsEditing((prev) => !prev),
          }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}
