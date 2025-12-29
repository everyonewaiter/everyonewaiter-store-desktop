import { buttonVariants } from "@renderer/components/Button/Button.styles";
import { ColorName } from "@renderer/constants/ui";
import { BaseSize } from "@renderer/types/ui";
import { valueOf } from "@renderer/utils/type";
import { type VariantProps } from "class-variance-authority";

type ScreenSize = BaseSize;

type ButtonSize = BaseSize | "xl" | "custom";

type ColorNameValue = valueOf<typeof ColorName>;

type ButtonColor = Extract<
  ColorNameValue,
  "primary" | "approve" | "black" | "grey" | "apply" | "reject" | "reapply"
>;

type ButtonVariant = VariantProps<typeof buttonVariants>;

interface BaseButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">, ButtonVariant {
  asChild?: boolean;
}

interface SimpleButtonProps extends BaseButtonProps {
  responsive?: false;
}

interface ResponsiveButtonProps extends BaseButtonProps {
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
        color?: ButtonColor;
        variant?: ButtonVariant["variant"];
      }
    >
  >;
  /**
   * - 전체 사이즈에 적용되는 공통 스타일
   */
  commonClassName?: string;
}

export {
  type ButtonColor,
  type ButtonSize,
  type ButtonVariant,
  type ResponsiveButtonProps,
  type ScreenSize,
  type SimpleButtonProps,
};
