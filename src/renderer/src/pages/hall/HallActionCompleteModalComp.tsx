import { Dialog } from "@renderer/components/Dialog";
import { ModalProps } from "@renderer/types/overlay";

interface HallActionCompleteModalCompProps extends ModalProps {
  tableNo: number;
  type: "order" | "call";
  staffCallText?: string;
}

function HallActionCompleteModalComp({
  type,
  tableNo,
  staffCallText,
  ...props
}: HallActionCompleteModalCompProps) {
  const title = type === "order" ? "모든 주문" : "호출";
  const subtitle =
    type === "order"
      ? `해당 테이블의 모든 주문이 완료됩니다.\n완료 후에는 주문 내역을 되돌릴 수 없습니다.`
      : `손님의 요청이 처리되었는지 다시 한 번 확인해 주세요.\n완료 후에는 호출 기록이 사라집니다.`;

  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper gap={32}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-gray-600 py-4">
              <h3 className="text-gray-0 text-xl font-semibold">테이블 번호</h3>
              <strong className="text-gray-0 text-3xl font-bold">
                {String(tableNo).padStart(2, "0")}
              </strong>
            </div>
            {staffCallText && (
              <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-gray-600 py-4">
                <span className="text-gray-0 text-lg font-semibold">{staffCallText}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <h2 className="text-gray-0 text-xl font-semibold">{title}을 완료 처리하시겠습니까?</h2>
            <p className="text-gray-0 text-center text-base font-normal whitespace-pre-line">
              {subtitle}
            </p>
          </div>
        </div>
        <Dialog.Footer
          buttonSize="lg"
          primaryButton={{ text: type === "call" ? "완료" : "전체 완료", onClick: () => {} }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default HallActionCompleteModalComp;
