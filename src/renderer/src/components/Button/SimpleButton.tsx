import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { buttonVariants } from "@renderer/components/Button/Button.styles";
import { SimpleButtonProps } from "@renderer/components/Button/Button.types";
import cn from "@renderer/utils/cn";

function SimpleButton(
  {
    className,
    variant,
    color = "primary",
    disabled,
    asChild = false,
    ...buttonProps
  }: SimpleButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        buttonVariants({
          variant,
          color: disabled ? "grey" : color,
        }),
        className
      )}
      ref={ref}
      disabled={disabled}
      type={buttonProps.type ?? "button"}
      {...buttonProps}
    />
  );
}

export default React.forwardRef<HTMLButtonElement, SimpleButtonProps>(SimpleButton);
