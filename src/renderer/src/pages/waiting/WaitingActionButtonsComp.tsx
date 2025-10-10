import { Button } from "@renderer/components";
import { WAITING_ACTIONS } from "@renderer/pages/waiting/constants";

interface WaitingActionButtonsCompProps {
  callCount: number;
}

function WaitingActionButtonsComp({ callCount }: WaitingActionButtonsCompProps) {
  return (
    <nav className="flex md:w-30 md:flex-col md:gap-3 lg:w-auto lg:flex-row lg:items-center lg:gap-5">
      {WAITING_ACTIONS.map((action, index) => (
        <Button
          key={action.label}
          className="flex cursor-pointer flex-col gap-0.5 md:min-h-14 md:rounded-2xl md:!px-6 md:!py-4 lg:h-30 lg:min-h-0 lg:w-30 lg:rounded-[20px] lg:!px-0 lg:!py-0"
          style={{ color: action.textColor }}
          {...action}
        >
          <div className="flex md:flex-row md:items-center md:gap-1 lg:flex-col lg:gap-0.5">
            {action.icon}
            <span className="font-semibold md:text-lg lg:text-xl">{action.label}</span>
          </div>
          {callCount > 0 && index === 0 && (
            <span className="text-sm font-medium">총 {callCount}회 · 15분전</span>
          )}
        </Button>
      ))}
    </nav>
  );
}

export default WaitingActionButtonsComp;
