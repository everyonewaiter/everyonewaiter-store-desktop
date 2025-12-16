import { useMemo } from "react";
import { AlarmIcon, StopwatchIcon } from "@renderer/assets/icons";
import { ORDER_TYPE_TEXT } from "@renderer/constants/pos";
import { usePosTablesElapsedTime } from "@renderer/pages/pos/tables/usePosTablesElapsedTime";
import { Table } from "@renderer/types/domain";
import cn from "@renderer/utils/cn";

interface PosTablesBoxCompProps extends Table {
  table?: Table;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}

function PosTablesBoxComp({ onClick, className, disabled, ...props }: PosTablesBoxCompProps) {
  const orderedAt = useMemo(() => {
    return typeof props.orderedAt === "string"
      ? props.orderedAt?.split(" ")[1].slice(0, 5)
      : "00:00";
  }, [props.orderedAt]);

  const { elapsedTime } = usePosTablesElapsedTime(props.orderedAt);

  return (
    <button
      className={cn(
        "flex aspect-[432/320] flex-col items-start justify-between rounded-3xl border-2 border-gray-500 p-7",
        props.hasOrder && props.orderType === "POSTPAID" ? "border-primary" : "",
        props.hasOrder && props.orderType === "PREPAID" ? "border-[#2E8CFF]" : "",
        disabled ? "cursor-default border-none bg-gray-500/60" : "cursor-pointer",
        className
      )}
      onClick={() => (disabled ? null : onClick())}
    >
      <header className="flex w-full items-center justify-between">
        <div
          className={cn(
            "flex h-9 items-center justify-center rounded-3xl bg-gray-700 px-4 py-1 text-[15px] font-normal text-gray-300",
            !disabled && props.hasOrder && props.orderType === "POSTPAID"
              ? "bg-primary/10 text-primary"
              : "",
            !disabled && props.hasOrder && props.orderType === "PREPAID"
              ? "bg-[#2E8CFF]/10 text-[#2E8CFF]"
              : "",
            disabled && "bg-gray-500/60 text-gray-300"
          )}
        >
          {props.hasOrder
            ? ORDER_TYPE_TEXT[props.orderType as keyof typeof ORDER_TYPE_TEXT]
            : "대기"}
        </div>
        <div className="flex items-center gap-2">
          <time
            className={cn(
              "text-gray-0 flex h-9 items-center justify-center gap-1.5 rounded-3xl px-4 py-1 text-[15px] font-normal",
              disabled ? "text-gray-300" : "bg-gray-700"
            )}
          >
            <AlarmIcon width={20} height={20} color="#222222" />
            {orderedAt || "00:00"}
          </time>
          <time
            className={cn(
              "text-gray-0 flex h-9 items-center justify-center gap-1.5 rounded-3xl px-4 py-1 text-[15px] font-normal",
              disabled ? "text-gray-300" : "bg-gray-700"
            )}
          >
            <StopwatchIcon width={20} height={20} color="#222222" />
            {elapsedTime || "00:00"}
          </time>
        </div>
      </header>
      <h2
        className={cn(
          "items-center font-bold md:text-3xl lg:text-4xl",
          disabled ? "text-gray-300" : "text-gray-0"
        )}
      >
        {props.tableNo}번 테이블
      </h2>
      <section className="flex w-full flex-row items-start gap-8">
        <div className="flex flex-1 flex-col items-start gap-[11px]">
          <span className={cn("text-sm font-normal", disabled ? "text-gray-300" : "text-gray-0")}>
            주문한 메뉴
          </span>
          <div className={cn("text-xl font-semibold", disabled ? "text-gray-300" : "text-gray-0")}>
            {props.orderMenuCount > 0 ? (
              <div className="flex items-end gap-1.5">
                <strong className="text-xl font-semibold">{props.orderMenuName}</strong>
                {props.orderMenuCount > 1 && (
                  <span className="text-s mb-0.5">외 {props.orderMenuCount - 1}개</span>
                )}
              </div>
            ) : (
              <strong className={cn("text-xl", disabled ? "text-gray-300" : "text-gray-0")}>
                -
              </strong>
            )}
          </div>
        </div>
        <div className="flex w-[140px] flex-col items-start gap-[11px]">
          <span className={cn("text-sm font-normal", disabled ? "text-gray-300" : "text-gray-0")}>
            총 주문금액
          </span>
          <p className={cn("text-xl font-semibold", disabled ? "text-gray-300" : "text-gray-0")}>
            {props.totalOrderPrice ? `${props.totalOrderPrice?.toLocaleString()}원` : "-"}
          </p>
        </div>
      </section>
    </button>
  );
}

export default PosTablesBoxComp;
