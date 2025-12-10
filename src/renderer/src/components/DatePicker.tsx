import React, { useState } from "react";
import { CalendarIcon } from "@renderer/assets/icons";
import Button from "@renderer/components/Button/Button";
import { Calendar } from "@renderer/components/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@renderer/components/Popover";
import cn from "@renderer/utils/cn";

interface DatePickerProps {
  date: Date | null;
  onSetDate: React.Dispatch<React.SetStateAction<Date>>;
}

function DatePicker({ date, onSetDate }: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      document.body.classList.add("disable-modal-close");
    } else {
      document.body.classList.remove("disable-modal-close");
    }
    setOpen(newOpen);
  };

  const formattedDate = date
    ? date
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\.$/, "")
    : null;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          color="black"
          className={cn(
            "relative h-[48px] w-[280px] justify-between rounded-[10px] border border-gray-500 px-4 py-3 pr-4 text-left text-base font-normal hover:bg-white",
            !date && "text-muted-foreground"
          )}
        >
          {date ? (
            <span className="text-gray-0">{formattedDate}</span>
          ) : (
            <span className="text-base text-gray-200">YYYY.MM.DD</span>
          )}
          <CalendarIcon className="absolute right-3 size-8 text-gray-200" />
        </Button>
      </PopoverTrigger>
      {open && (
        <PopoverContent
          className="!z-[10000] !ml-15 w-auto !rounded-3xl border-none p-0"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <Calendar
            mode="single"
            selected={date!}
            onSelect={(day) => {
              if (day) {
                onSetDate(day);
                setOpen(false);
              }
            }}
            initialFocus
          />
        </PopoverContent>
      )}
    </Popover>
  );
}

export default DatePicker;
