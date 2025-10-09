import { ReactElement } from "react";
import { BellRingingIcon, DoorOpenIcon, XCircleIcon } from "@renderer/assets/icons";
import type { ButtonColor, ButtonVariant } from "@renderer/components/Button/Button.types";

export interface WaitingActionType {
  icon: ReactElement<SVGElement>;
  label: string;
  variant: ButtonVariant["variant"];
  color: ButtonColor;
  textColor: string;
}

export const WAITING_ACTIONS: WaitingActionType[] = [
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
