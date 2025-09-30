import cn from "@renderer/utils/cn";

interface InputProps {
  hasError?: boolean;
}

type CombineInputProps = React.ComponentProps<"input"> & InputProps;

function Input({ className, hasError, ...props }: CombineInputProps) {
  return (
    <input
      data-slot="form-input"
      data-error={hasError}
      aria-invalid={hasError}
      className={cn(
        "text-gray-0 md:text-s font-regular w-full border py-2.5 pr-3 outline-none placeholder:text-gray-300 disabled:border-gray-500 disabled:bg-gray-700 disabled:text-gray-300 disabled:placeholder:text-gray-400 md:h-9 md:rounded-lg md:pl-3 lg:h-12 lg:rounded-xl lg:pl-4 lg:text-[15px]",
        hasError ? "border-status-error" : "border-gray-600",
        className
      )}
      {...props}
    />
  );
}

export default Input;
