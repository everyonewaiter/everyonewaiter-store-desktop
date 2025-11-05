import { ReactElement } from "react";
import cn from "@renderer/utils/cn";

interface InputProps {
  hasError?: boolean;
  prefix?: ReactElement;
}

type CombineInputProps = Omit<React.ComponentProps<"input">, "prefix"> & InputProps;

function Input({ className, hasError, prefix, ...props }: CombineInputProps) {
  return (
    <div className="relative h-12 flex-1">
      {prefix && <div className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2">{prefix}</div>}
      <input
        data-slot="form-input"
        data-error={hasError}
        aria-invalid={hasError}
        className={cn(
          "text-gray-0 h-12 w-full rounded-xl border py-2.5 pr-3 pl-4 text-[15px] font-normal outline-none placeholder:text-gray-300 disabled:border-gray-500 disabled:bg-gray-700 disabled:text-gray-300 disabled:placeholder:text-gray-400",
          hasError ? "border-status-error" : "border-gray-600",
          prefix && "pl-10",
          className
        )}
        {...props}
      />
    </div>
  );
}

export default Input;
