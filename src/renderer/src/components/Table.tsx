import * as React from "react";
import cn from "@renderer/utils/cn";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

Table.Header = function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("h-16 rounded-2xl bg-gray-700", className)}
      {...props}
    />
  );
};

Table.Body = function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn("w-full", className)} {...props} />;
};

Table.Row = function TableRow({
  className,
  ...props
}: React.ComponentProps<"tr"> & { isHead?: boolean }) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "h-16 w-full cursor-pointer border-b border-gray-600 [&:last-child]:border-none",
        className
      )}
      {...props}
    />
  );
};

Table.Head = function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-gray-0 flex h-full items-center justify-center text-base font-bold",
        className
      )}
      {...props}
    />
  );
};

Table.Cell = function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "text-gray-0 flex h-full items-center justify-center text-base font-medium",
        className
      )}
      align="center"
      {...props}
    />
  );
};

export default Table;
