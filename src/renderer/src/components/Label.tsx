import { ComponentProps } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import cn from "@renderer/utils/cn";

interface LabelProps {
  disabled?: boolean;
}

type CombineLabelProps = ComponentProps<typeof LabelPrimitive.Root> & LabelProps;

function Label({ className, disabled, ...props }: CombineLabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "lg:text-s flex items-center gap-2 text-xs select-none",
        disabled ? "text-gray-300" : "text-gray-0",
        className
      )}
      {...props}
    />
  );
}

export default Label;
