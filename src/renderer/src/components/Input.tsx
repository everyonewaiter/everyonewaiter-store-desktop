import { forwardRef, ReactElement } from "react";
import { ControllerFieldState } from "react-hook-form";
import cn from "@renderer/utils/cn";

interface InputProps {
  prefix?: ReactElement;
  fieldState?: ControllerFieldState;
}

type CombineInputProps = Omit<React.ComponentProps<"input">, "prefix"> & InputProps;

const Input = forwardRef<HTMLInputElement, CombineInputProps>(
  ({ className, prefix, fieldState, ...props }, ref) => {
    const hasError = !!fieldState?.error;
    const errorMessage = fieldState?.error?.message;

    return (
      <div className="flex w-full flex-1 flex-col gap-1">
        <div className="relative h-9 lg:h-12">
          {prefix && (
            <div className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2">{prefix}</div>
          )}
          <input
            ref={ref}
            data-slot="form-input"
            data-error={hasError}
            aria-invalid={hasError}
            className={cn(
              "text-gray-0 text-s h-9 w-full rounded-lg border py-2.5 pr-3 pl-3 font-normal outline-none placeholder:text-gray-300 disabled:border-gray-500 disabled:bg-gray-700 disabled:text-gray-300 disabled:placeholder:text-gray-400 lg:h-12 lg:rounded-xl lg:pl-4 lg:text-[15px]",
              hasError ? "border-status-error" : "border-gray-600",
              prefix && "pl-10",
              className
            )}
            {...props}
          />
        </div>
        {errorMessage && <p className="text-status-error ml-1 text-xs">{errorMessage}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
