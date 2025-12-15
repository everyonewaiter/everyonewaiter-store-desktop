import { useState } from "react";
import { Dialog } from "@renderer/components/Dialog";
import {
  useGetTableActivity,
  useUpdateMemo,
} from "@renderer/pages/pos/tables/[id]/usePosTablesDetailApi";
import { ModalProps } from "@renderer/types/overlay";

interface PosTablesDetailMemoModalCompProps extends ModalProps {
  tableNo: number;
}

function PosTablesDetailMemoModalComp({ tableNo, ...props }: PosTablesDetailMemoModalCompProps) {
  const [isEditing, setIsEditing] = useState(false);

  const { data: activity } = useGetTableActivity(tableNo);
  const memos = activity?.orders.map((order) => order.memo) ?? [];

  const [updatedMemos, setUpdatedMemos] = useState<string[]>(memos);

  const handleClose = () => {
    setIsEditing(false);
    setUpdatedMemos(memos);
    props.close();
  };

  const { mutateAsync: updateMemo } = useUpdateMemo();

  const handleUpdateMemos = async () => {
    if (!activity?.orders) return;

    for (let index = 0; index < updatedMemos.length; index++) {
      const memo = updatedMemos[index];

      if (!activity?.orders[index] || activity?.orders[index].memo === memo) continue;

      await updateMemo({ tableNo, orderId: activity?.orders[index].orderId, memo });
    }
    setIsEditing(false);
    props.close();
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={handleClose}>
      <Dialog.Wrapper>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-0 text-center text-2xl font-semibold">메모</h2>
            <span className="text-gray-0 text-lg font-semibold">{tableNo}번 테이블</span>
          </div>
          {memos?.map((memo, index) => (
            <div className="flex flex-col gap-[5px]" key={memo}>
              <span className="text-gray-0 text-lg font-semibold">{index + 1}번 주문 메모</span>
              <textarea
                className="placholder:text-gray-100 text-gray-0 h-20 w-full resize-none rounded-xl border border-gray-600 px-4 pt-3 pb-4 text-base font-medium outline-none read-only:cursor-default"
                readOnly={!isEditing}
                placeholder="메모가 없습니다."
                value={updatedMemos[index]}
                onChange={(e) => {
                  const newMemos = [...updatedMemos];
                  newMemos[index] = e.target.value;
                  setUpdatedMemos(newMemos);
                }}
                maxLength={10}
              />
            </div>
          ))}
        </div>
        <Dialog.Footer
          buttonSize="xl"
          primaryButton={{
            color: isEditing ? "primary" : "black",
            text: isEditing ? "저장" : "수정",
            onClick: isEditing ? handleUpdateMemos : () => setIsEditing(true),
          }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosTablesDetailMemoModalComp;
