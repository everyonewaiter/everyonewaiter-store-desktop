import { PropsWithChildren, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ChevronDownIcon from "@renderer/assets/icons/chevron-down.svg?react";
import cn from "@renderer/utils/cn";

interface DropdownProps extends PropsWithChildren {
  data: { id: string; name: string }[];
  hasError?: boolean;
  type?: "default" | "chip";
  defaultText: string;
  onClickItem: (item: { id: string; name: string }) => void;
}

export default function Dropdown({
  data,
  hasError,
  type = "default",
  defaultText,
  onClickItem,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenu.Trigger
          className={cn(
            "text-gray-0 font-regular md:text-s flex flex-row items-center border border-gray-600 pr-3 transition-colors hover:border-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:border-gray-600 disabled:bg-gray-700 disabled:text-gray-300 md:pl-3 lg:pl-4 lg:text-sm",
            hasError && "border-status-error",
            type === "chip"
              ? "w-fit justify-center gap-2.5 rounded-[40px] md:h-8 md:pr-2 lg:h-9.5"
              : "h-12 w-full justify-between py-2.5 md:rounded-lg lg:rounded-xl"
          )}
        >
          {defaultText}
          <ChevronDownIcon
            className={cn(
              `h-4 w-4 transition-transform duration-500`,
              isOpen && "rotate-180",
              type === "default" ? "text-gray-300" : "text-gray-0"
            )}
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={4}
            className={cn(
              "z-[9999] mt-1 flex w-full flex-col gap-1 rounded-2xl bg-white text-left shadow-[0px_2px_10px_rgba(0,0,0,0.08)] md:px-1.5 md:py-2 lg:px-2 lg:py-3"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {data.map((el) => (
              <DropdownMenu.Item
                key={el.id}
                className="font-regular text-gray-0 text-s block h-9 w-full cursor-pointer rounded-xl px-3 outline-none focus:bg-gray-700 md:min-w-[93px] lg:min-w-[96px] lg:text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onClickItem(el);
                }}
              >
                {el.name}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
