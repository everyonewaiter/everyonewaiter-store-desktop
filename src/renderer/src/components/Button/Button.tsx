import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { buttonVariants } from "@renderer/components/Button/Button.styles";
import { ButtonColors, ButtonSize, ScreenSize } from "@renderer/components/Button/Button.types";
import cn from "@renderer/utils/cn";
import { type VariantProps } from "class-variance-authority";

export interface BaseButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export interface ResponsiveButtonProps extends BaseButtonProps {
  /**
   * 반응형 설정을 사용할지 여부
   */
  responsive?: true;
  /**
   * - `buttonSize`: 버튼 사이즈
   * - `className`: 해당 버튼 사이즈에 대한 추가적인 스타일 적용 (옵션)
   * - Example: `sm: { buttonSize: 'md', className: '...' }`
   */
  responsiveButtons: Partial<
    Record<
      ScreenSize,
      {
        buttonSize: ButtonSize;
        className?: string;
        color?: string;
        variant?: string;
      }
    >
  >;
  /**
   * - 전체 사이즈에 적용되는 공통 스타일
   */
  commonClassName?: string;
}

export interface SimpleButtonProps extends BaseButtonProps {
  responsive?: false;
}

export type ButtonProps = ResponsiveButtonProps | SimpleButtonProps;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  if (props.responsive) {
    const {
      responsiveButtons,
      commonClassName,
      variant,
      disabled,
      color = "primary",
      asChild = false,
      children,
      ...buttonProps
    } = props as ResponsiveButtonProps;

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

    const getClassName = (screenSize: ScreenSize) => {
      let buttonClassName = "hidden";

      if (screenSize === "sm") {
        buttonClassName = "flex md:hidden";
      } else if (screenSize === "md") {
        buttonClassName = "hidden md:flex lg:!hidden";
      } else if (screenSize === "lg") {
        buttonClassName = "hidden lg:!flex";
      }

      return buttonClassName;
    };

    const Comp = asChild ? Slot : "button";

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
                  variant: (variant || buttonConfig?.variant) as VariantProps<
                    typeof buttonVariants
                  >["variant"],
                  color: disabled ? "grey" : ((color || buttonConfig?.color) as ButtonColors),
                }),
                getClassName(screenSize as ScreenSize),
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

  const {
    className,
    variant,
    color = "primary",
    disabled,
    asChild = false,
    ...buttonProps
  } = props as SimpleButtonProps;

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
});

Button.displayName = "Button";

export default Button;
