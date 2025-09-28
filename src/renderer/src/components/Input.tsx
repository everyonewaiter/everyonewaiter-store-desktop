import { InputHTMLAttributes } from "react";
import cn from "../utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export default function Input({ hasError, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "text-gray-0 md:text-s font-regular w-full border border-gray-600 py-2.5 pl-4 outline-none placeholder:text-gray-300 disabled:border-gray-500 disabled:bg-gray-700 disabled:text-gray-300 md:h-9 md:rounded-lg md:pr-4 lg:h-12 lg:rounded-xl lg:pr-3 lg:text-[15px]",
        hasError && "border-status-error"
      )}
      {...props}
    />
  );
}
