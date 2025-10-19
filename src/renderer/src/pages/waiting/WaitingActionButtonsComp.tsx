import { ReactElement } from "react";
import { BellRingingIcon, DoorOpenIcon, XCircleIcon } from "@renderer/assets/icons";
import { Button } from "@renderer/components";
import { ButtonColor, ButtonVariant } from "@renderer/components/Button/Button.types";
import { Waiting } from "@renderer/types/domain";
import { overlay } from "overlay-kit";
import WaitingModalComp from "./WaitingModalComp";

interface WaitingActionType {
  icon: ReactElement<SVGElement>;
  label: string;
  variant: ButtonVariant["variant"];
  color: ButtonColor;
  textColor: string;
}

const WAITING_ACTIONS: WaitingActionType[] = [
  {
    icon: <BellRingingIcon className="md:h-6 md:w-6 lg:h-10 lg:w-10" />,
    label: "호출",
    variant: "default",
    color: "primary",
    textColor: "white",
  },
  {
    icon: <DoorOpenIcon className="md:h-6 md:w-6 lg:h-10 lg:w-10" />,
    label: "입장",
    variant: "outline",
    color: "primary",
    textColor: "primary",
  },
  {
    icon: <XCircleIcon className="md:h-6 md:w-6 lg:h-10 lg:w-10" />,
    label: "취소",
    variant: "default",
    color: "grey",
    textColor: "#999999",
  },
];

interface WaitingActionButtonsCompProps {
  callCount: number;
  waiting: Waiting;
}

function WaitingActionButtonsComp({ callCount, waiting }: WaitingActionButtonsCompProps) {
  return (
    <nav className="flex md:w-30 md:flex-col md:gap-3 lg:w-auto lg:flex-row lg:items-center lg:gap-5">
      {WAITING_ACTIONS.map((action, index) => (
        <Button
          key={action.label}
          className="flex cursor-pointer flex-col gap-0.5 md:min-h-14 md:rounded-2xl md:!px-6 md:!py-4 lg:h-30 lg:min-h-0 lg:w-30 lg:rounded-[20px] lg:!px-0 lg:!py-0"
          style={{ color: action.textColor }}
          {...action}
          onClick={() => {
            let type: "call" | "enter" | "cancel";
            if (action.label === "호출") {
              type = "call";
            } else if (action.label === "입장") {
              type = "enter";
            } else if (action.label === "취소") {
              type = "cancel";
            }

            overlay.open((o) => <WaitingModalComp type={type} waiting={waiting} {...o} />);
          }}
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
