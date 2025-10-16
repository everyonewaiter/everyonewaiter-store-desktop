import * as React from "react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@renderer/assets/icons";
import Button from "@renderer/components/Button/Button";
import { ButtonColor } from "@renderer/components/Button/Button.types";
import cn from "@renderer/utils/cn";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("rounded-3xl border-none bg-white p-5 md:w-[340px] lg:w-[552px]", className)}
      style={{ boxShadow: "0px 2px 20px rgba(0, 0, 0, 0.08)" }}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString("ko-KR", { month: "long" }),
        formatCaption: (date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월`,
        formatWeekdayName: (weekday) =>
          ["일", "월", "화", "수", "목", "금", "토"][weekday.getDay()],
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("flex gap-8 flex-col relative", defaultClassNames.months),
        month: cn("flex flex-col w-full md:gap-6 lg:gap-8"),
        nav: cn(
          "flex items-center w-full justify-between md:h-[27px] lg:h-8",
          defaultClassNames.nav
        ),
        button_previous: cn(
          "size-6 aria-disabled:opacity-50 p-0 select-none text-black cursor-pointer flex items-center justify-center",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          "aria-disabled:opacity-50 p-0 select-none text-black cursor-pointer flex items-center justify-center",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "top-0 absolute flex items-center justify-center h-8 w-full text-xl font-bold",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn("relative rounded-md", defaultClassNames.dropdown_root),
        dropdown: cn("absolute bg-popover inset-0 opacity-0", defaultClassNames.dropdown),
        table: "w-full",
        weekdays: cn(
          "flex justify-between md:h-9 md:pb-6 lg:h-11 lg:pb-8 items-start",
          defaultClassNames.weekdays
        ),
        weekday: cn(
          "text-gray-0 md:w-8 lg:w-10 h-8 text-center font-medium text-sm select-none flex justify-center ",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full justify-between", defaultClassNames.week),
        day: cn("relative p-0 text-center mt-2", defaultClassNames.day),
        today: cn("text-blue-600 rounded-full", defaultClassNames.today),
        outside: cn("text-gray-300", defaultClassNames.outside),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({
          className,
          rootRef,
          ...props
        }: React.ComponentProps<"div"> & { rootRef?: React.Ref<HTMLDivElement> }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },

        Chevron: ({
          className,
          orientation = "down",
          ...props
        }: {
          className?: string;
          size?: number;
          disabled?: boolean;
          orientation?: "left" | "right" | "down" | "up";
        }) => {
          if (orientation === "left") {
            return (
              <Button variant="ghost" color="black">
                <ChevronLeftIcon className={cn("size-6", className)} {...props} />
              </Button>
            );
          }

          if (orientation === "right") {
            return (
              <Button variant="ghost" color="black">
                <ChevronRightIcon className={cn("size-6", className)} {...props} />
              </Button>
            );
          }

          return (
            <Button variant="ghost" color="black">
              <ChevronDownIcon className={cn("size-6", className)} {...props} />
            </Button>
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <div className="md:h-[38px] md:w-8 lg:h-12 lg:w-10">
      <Button
        ref={ref}
        variant="ghost"
        data-day={day.date.toLocaleDateString()}
        data-selected-single={modifiers.selected}
        className={cn(
          "data-[selected-single=true]:bg-primary inset-0 rounded-full text-sm font-normal text-gray-100 data-[selected-single=true]:text-white md:h-8 md:w-8 lg:h-10 lg:w-10",
          modifiers.outside && "text-[#C0C0C0]",
          defaultClassNames.day,
          className
        )}
        {...props}
        color={"primary" as ButtonColor}
      />
    </div>
  );
}

export { Calendar, CalendarDayButton };
