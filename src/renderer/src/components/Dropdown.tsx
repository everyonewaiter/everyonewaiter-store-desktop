import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ChevronDownIcon from "../assets/icons/chevron-down.svg?react";
import cn from "../utils/cn";

interface DropdownProps extends DropdownMenu.DropdownMenuProps {
  data: { id: string; name: string }[];
  hasError?: boolean;
  type?: "default" | "chip";
  defaultText: string;
  disabled?: boolean;
  onChange?: (item: { id: string; name: string }) => void;
}

export default function Dropdown({
  data,
  hasError,
  type = "default",
  defaultText,
  disabled,
  onChange,
  ...props
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ id: string; name: string } | null>(null);

  return (
    <div className="w-full">
      <DropdownMenu.Root open={isOpen} onOpenChange={disabled ? undefined : setIsOpen} {...props}>
        <DropdownMenu.Trigger
          className={cn(
            "font-regular md:text-s flex flex-row items-center border border-gray-600 pr-3 transition-colors hover:border-gray-500 focus:outline-none disabled:border-gray-600 disabled:bg-gray-700 disabled:text-gray-300 md:h-9 md:pl-3 lg:h-12 lg:pl-4 lg:text-sm",
            hasError && "border-status-error",
            type === "chip"
              ? "w-fit justify-center gap-2.5 rounded-[40px] md:h-8 md:pr-2 lg:h-9.5"
              : "h-12 w-full justify-between py-2.5 md:rounded-lg lg:rounded-xl",
            disabled ? "!cursor-default" : "!cursor-pointer"
          )}
        >
          {selectedItem ? selectedItem.name : defaultText}
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
              "z-[9999] mt-1 flex flex-col gap-1 bg-white text-left shadow-[0px_2px_10px_rgba(0,0,0,0.08)] md:rounded-xl md:px-1.5 md:py-2 lg:rounded-2xl lg:px-2 lg:py-3"
            )}
            style={{ minWidth: "var(--radix-dropdown-menu-trigger-width)" }}
          >
            {data.map((el) => (
              <DropdownMenu.Item
                key={el.id}
                className="font-regular text-gray-0 text-s flex h-9 min-w-full cursor-pointer items-center px-3 outline-none focus:bg-gray-700 md:rounded-lg lg:rounded-xl lg:text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem(el);
                  onChange?.(el);
                  setIsOpen(false);
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
