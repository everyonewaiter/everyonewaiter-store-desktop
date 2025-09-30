import * as React from "react";
import { ResponsiveButtonProps, SimpleButtonProps } from "@renderer/components/Button/Button.types";
import ResponsiveButton from "@renderer/components/Button/ResponsiveButton";
import SimpleButton from "@renderer/components/Button/SimpleButton";

export type ButtonProps = ResponsiveButtonProps | SimpleButtonProps;

function Button({ responsive, ...props }: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) {
  if (responsive) {
    return <ResponsiveButton ref={ref} {...(props as ResponsiveButtonProps)} />;
  } else {
    return <SimpleButton ref={ref} {...(props as SimpleButtonProps)} />;
  }
}

export default React.forwardRef<HTMLButtonElement, ButtonProps>(Button);
