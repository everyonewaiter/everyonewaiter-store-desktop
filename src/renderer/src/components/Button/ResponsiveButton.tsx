import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { buttonVariants } from "@renderer/components/Button/Button.styles";
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
  ResponsiveButtonProps,
  ScreenSize,
} from "@renderer/components/Button/Button.types";
import cn from "@renderer/utils/cn";

function ResponsiveButton(
  {
    responsiveButtons,
    commonClassName,
    variant,
    disabled,
    color = "primary",
    asChild = false,
    children,
    ...buttonProps
  }: ResponsiveButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const Comp = asChild ? Slot : "button";

  const buttonStyle = (size: ButtonSize, className: string) => {
    switch (size) {
      case "sm":
        return `button-sm ${className}`;
      case "md":
        return `button-md ${className}`;
      case "lg":
        return `button-lg ${className}`;
      case "xl":
        return `button-xl ${className}`;
      case "custom":
        return className;
      default:
        throw new Error("존재하지 않는 버튼 사이즈입니다.");
    }
  };

  const hideButton = (screenSize: ScreenSize) => {
    switch (screenSize) {
      case "sm":
        return "flex md:hidden";
      case "md":
        return "hidden md:flex lg:!hidden";
      case "lg":
        return "hidden lg:!flex";
      default:
        return "hidden";
    }
  };

  return (
    <>
      {Object.keys(responsiveButtons).map((screenSize) => {
        const buttonConfig = responsiveButtons[screenSize as ScreenSize];
        return (
          <Comp
            key={screenSize}
            ref={ref}
            className={cn(
              buttonVariants({
                variant: (variant || buttonConfig?.variant) as ButtonVariant["variant"],
                color: disabled ? "grey" : ((color || buttonConfig?.color) as ButtonColor),
              }),
              hideButton(screenSize as ScreenSize),
              buttonStyle(buttonConfig?.buttonSize ?? "md", buttonConfig?.className ?? ""),
              commonClassName
            )}
            disabled={disabled}
            type={buttonProps.type ?? "button"}
            {...buttonProps}
          >
            {children}
          </Comp>
        );
      })}
    </>
  );
}

export default React.forwardRef<HTMLButtonElement, ResponsiveButtonProps>(ResponsiveButton);
