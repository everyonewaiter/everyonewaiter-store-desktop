import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import cn from "@renderer/utils/cn";

interface CheckboxProps extends CheckboxPrimitive.CheckboxProps {
  hasError?: boolean;
  size?: number;
}

function Checkbox({ hasError, size = 18, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "hover:border-primary data-[state=checked]:bg-primary [data-state=checked]:border-primary shrink-0 cursor-pointer rounded-[4px] border border-gray-400 outline-none disabled:cursor-default disabled:border-gray-400 disabled:bg-gray-600 data-[state=checked]:disabled:opacity-40",
        hasError && "border-status-error bg-white"
      )}
      style={{ width: size, height: size }}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex h-full w-full items-center justify-center text-current"
      >
        <svg
          width={size * 0.556}
          height={size * 0.556}
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.33366 2.5L3.75033 7.08333L1.66699 5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export default Checkbox;
