import { Dialog } from "@renderer/components/Dialog";
import WaitingInfoComp from "@renderer/pages/waiting/WaitingInfoComp";
import { Waiting } from "@renderer/types/domain";

interface WaitingModalCompProps {
  type: "call" | "enter" | "cancel";
  waiting: Waiting;
}

function WaitingModalComp({ type, waiting }: WaitingModalCompProps) {
  return (
    <Dialog open={true}>
      <Dialog.Wrapper>
        <Dialog.Header>웨이팅 손님 호출</Dialog.Header>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4 rounded-3xl bg-gray-700 p-5">
            <div className="flex flex-1 flex-col items-center gap-3">
              <span className="text-lg font-medium">대기번호</span>
              <strong className="text-4xl font-bold">001</strong>
            </div>
            <WaitingInfoComp isModal waiting={waiting} />
          </div>
          {type === "call" && (
            <div className="flex h-13 gap-2">
              <div className="flex w-full items-center justify-between rounded-xl bg-gray-700 px-5">
                <span className="text-gray-0 text-base font-medium">총 호출한 횟수</span>
                <span className="text-gray-0 text-xl font-semibold">6회</span>
              </div>
              <div className="border-status-error flex w-full items-center justify-between rounded-xl border px-5">
                <span className="text-status-error text-base font-medium">마지막 호출 시간</span>
                <span className="text-status-error text-xl font-semibold">15분 전</span>
              </div>
            </div>
          )}
        </div>
        <div className="text-gray-0 py-3 text-center text-xl font-normal whitespace-pre-line">
          {type === "call" && `호출하시겠습니까?`}
          {type === "enter" &&
            `위 손님이 입장하셨나요?\n입장하셨다면 입장 버튼을 눌러 상태를 바꿔주세요.`}
          {type === "cancel" && `취소하시겠습니까?`}
        </div>
        <Dialog.Footer />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default WaitingModalComp;
