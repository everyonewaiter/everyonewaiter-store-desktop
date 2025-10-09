import { Button } from "@renderer/components";
import { WAITING_ACTIONS } from "@renderer/pages/waiting/constants";

interface WaitingActionButtonsCompProps {
  callCount: number;
}

function WaitingActionButtonsComp({ callCount }: WaitingActionButtonsCompProps) {
  return (
    <>
      <nav className="items-center gap-5 md:hidden lg:flex">
        {WAITING_ACTIONS.map((action, index) => (
          <Button
            key={action.label}
            className="flex h-30 w-30 cursor-pointer flex-col gap-0.5 rounded-[20px]"
            style={{ color: action.textColor }}
            {...action}
          >
            {action.icon}
            <span className="text-xl font-semibold">{action.label}</span>
            {callCount > 0 && index === 0 && (
              <span className="text-sm font-medium">총 {callCount}회 · 15분전</span>
            )}
          </Button>
        ))}
      </nav>
      <nav className="w-30 flex-col gap-3 md:flex lg:hidden">
        {WAITING_ACTIONS.map((action, index) => (
          <Button
            key={action.label}
            className="flex min-h-14 flex-col gap-0.5 rounded-2xl !px-6 !py-4"
            style={{ color: action.textColor }}
            {...action}
          >
            <div className="flex items-center gap-1">
              {action.icon}
              <span className="font-regular text-lg">{action.label}</span>
            </div>
            {callCount > 0 && index === 0 && (
              <span className="text-sm font-medium">총 {callCount}회 · 15분전</span>
            )}
          </Button>
        ))}
      </nav>
    </>
  );
}

export default WaitingActionButtonsComp;
