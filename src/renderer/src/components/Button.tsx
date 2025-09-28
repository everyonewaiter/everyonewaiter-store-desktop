import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import cn from "../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none cursor-pointer border",
  {
    variants: {
      variant: {
        default: "",
        outline: "bg-transparent",
      },
      color: {
        primary: "",
        black: "",
        grey: "",
        apply: "",
        reject: "",
        approve: "",
        reapply: "",
      },
    },
    defaultVariants: {
      variant: "default",
      color: "primary",
    },
    compoundVariants: [
      {
        variant: "default",
        color: "primary",
        class: "bg-primary text-white border-primary hover:bg-point",
      },
      {
        variant: "default",
        color: "black",
        class: "bg-black text-white border-black",
      },
      {
        variant: "default",
        color: "grey",
        class: "bg-gray-700 text-gray-300 border-gray-700",
      },
      {
        variant: "default",
        color: "apply",
        class: "bg-gray-400 text-white border-gray-400",
      },
      {
        variant: "default",
        color: "reject",
        class: "bg-[#FF5555] text-white border-[#FF5555]",
      },
      {
        variant: "default",
        color: "approve",
        class: "bg-[#2E8CFF] text-white border-[#2E8CFF]",
      },
      {
        variant: "default",
        color: "reapply",
        class: "bg-[#FFAB45] text-white border-[#FFAB45]",
      },

      {
        variant: "outline",
        color: "primary",
        class: "text-primary border-primary",
      },
      {
        variant: "outline",
        color: "black",
        class: "text-black border-black hover:bg-black hover:text-white",
      },
      {
        variant: "outline",
        color: "grey",
        class: "text-gray-300 border-gray-700 hover:bg-gray-700",
      },
      {
        variant: "outline",
        color: "apply",
        class: "text-gray-400 border-gray-400 hover:bg-gray-400",
      },
      {
        variant: "outline",
        color: "reject",
        class: "text-[#FF5555] border-[#FF5555] hover:bg-[#FF5555]",
      },
      {
        variant: "outline",
        color: "approve",
        class: "text-[#2E8CFF] border-[#2E8CFF] hover:bg-[#2E8CFF] hover:text-white",
      },
      {
        variant: "outline",
        color: "reapply",
        class: "text-[#FFAB45] border-[#FFAB45] hover:bg-[#FFAB45] hover:text-white",
      },
    ],
  }
);

export type ButtonColors =
  | "primary"
  | "approve"
  | "black"
  | "grey"
  | "apply"
  | "reject"
  | "reapply"
  | undefined;

export type ButtonSize = "sm" | "md" | "lg" | "xl" | "custom";
export type ScreenSize = "sm" | "md" | "lg";

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
      color = "primary",
      disabled,
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
