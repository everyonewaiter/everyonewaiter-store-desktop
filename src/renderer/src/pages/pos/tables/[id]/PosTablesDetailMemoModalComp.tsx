import { useState } from "react";
import { Dialog } from "@renderer/components/Dialog";
import {
  useGetTableActivity,
  useUpdateMemo,
} from "@renderer/pages/pos/tables/[id]/usePosTablesDetailApi";
import { ModalProps } from "@renderer/types/overlay";
import dayjs from "dayjs";

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

  const handleShowUpdate = (index: number) => {
    const order = activity?.orders[index];
    if (!order?.updatedAt || order.updatedAt === order.createdAt) return null;
    return `${dayjs(order.updatedAt).format("YY.MM.DD HH:mm")} 수정됨`;
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={handleClose}>
      <Dialog.Wrapper>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-0 text-center text-2xl font-semibold">메모</h2>
            <span className="text-gray-0 text-lg font-semibold">{tableNo}번 테이블</span>
          </div>
          {memos?.map((memo, index) => {
            if (!memo) return null;
            return (
              <div className="flex flex-col gap-[5px]" key={memo}>
                <div className="flex items-end justify-between">
                  <span className="text-gray-0 text-lg font-semibold">{index + 1}번 주문 메모</span>
                  <span className="text-s text-gray-400">{handleShowUpdate(index)}</span>
                </div>
                <textarea
                  className="placholder:text-gray-100 text-gray-0 h-20 w-full resize-none rounded-xl border border-gray-600 px-4 pt-3 pb-4 text-base font-medium outline-none"
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
            );
          })}
        </div>
        <Dialog.Footer
          buttonSize="xl"
          primaryButton={{
            color: isEditing ? "primary" : "black",
            text: isEditing ? "저장" : "수정",
            onClick: isEditing ? handleUpdateMemos : () => setIsEditing(true),
            hide: !memos || memos.length === 0,
          }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosTablesDetailMemoModalComp;
