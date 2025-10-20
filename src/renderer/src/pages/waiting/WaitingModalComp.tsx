import { Dialog } from "@renderer/components/Dialog";
import { WAITING_TYPE_TEXT } from "@renderer/constants/waiting";
import WaitingInfoComp from "@renderer/pages/waiting/WaitingInfoComp";
import { Waiting } from "@renderer/types/domain";
import { ModalProps } from "@renderer/types/overlay";

interface WaitingModalCompProps extends ModalProps {
  type: "call" | "enter" | "cancel";
  waiting: Waiting;
}

function WaitingModalComp({ type, waiting, ...props }: WaitingModalCompProps) {
  const handleClick = () => {};

  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper>
        <Dialog.Header>웨이팅 손님 {WAITING_TYPE_TEXT[type.toUpperCase()]}</Dialog.Header>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4 rounded-3xl bg-gray-700 p-5">
            <div className="flex flex-1 flex-col items-center gap-3">
              <span className="text-lg font-medium">대기번호</span>
              <strong className="text-4xl font-bold">
                {String(waiting.number).padStart(3, "0")}
              </strong>
            </div>
            <WaitingInfoComp isModal waiting={waiting} />
          </div>
          {type === "call" && (
            <div className="flex h-13 gap-2">
              <div className="flex w-full items-center justify-between rounded-xl bg-gray-700 px-5">
                <span className="text-gray-0 text-base font-medium">총 호출한 횟수</span>
                <span className="text-gray-0 text-xl font-semibold">{waiting.callCount}회</span>
              </div>
              <div className="border-status-error flex w-full items-center justify-between rounded-xl border px-5">
                <span className="text-status-error text-base font-medium">마지막 호출 시간</span>
                <span className="text-status-error text-xl font-semibold">15분 전</span>
                {/* TODO: waiting.lastCallTime 표시 */}
              </div>
            </div>
          )}
        </div>
        <div className="text-gray-0 py-3 text-center text-xl font-normal whitespace-pre-line">
          {type === "enter"
            ? `입장 완료 처리 하시겠습니까?`
            : `${WAITING_TYPE_TEXT[type.toUpperCase()]}하시겠습니까?`}
        </div>
        <Dialog.Footer
          secondaryButton={{ onClick: props.close }}
          primaryButton={{ onClick: handleClick }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default WaitingModalComp;
