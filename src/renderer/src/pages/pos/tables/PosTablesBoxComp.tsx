import { PosViewPosTableDetail } from "@renderer/api/device/data-contracts";
import { AlarmIcon, StopwatchIcon } from "@renderer/assets/icons";
import { ORDER_TYPE_TEXT } from "@renderer/constants/pos";
import cn from "@renderer/utils/cn";

interface PosTablesBoxCompProps extends PosViewPosTableDetail {
  table?: PosViewPosTableDetail;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}

function PosTablesBoxComp({ onClick, className, disabled, ...props }: PosTablesBoxCompProps) {
  return (
    <button
      className={cn(
        "flex aspect-[432/320] flex-col items-start justify-between rounded-3xl border-2 border-gray-500 p-7",
        props.table?.hasOrder && props.table?.orderType === "POSTPAID" ? "border-primary" : "",
        props.table?.hasOrder && props.table?.orderType === "PREPAID" ? "border-[#2E8CFF]" : "",
        disabled ? "cursor-default border-none bg-gray-500/60" : "cursor-pointer",
        className
      )}
      onClick={() => (disabled ? null : onClick())}
    >
      <header className="flex w-full items-center justify-between">
        <div
          className={cn(
            "flex h-9 items-center justify-center rounded-3xl bg-gray-700 px-4 py-1 text-[15px] font-normal text-gray-300",
            !disabled && props.table?.hasOrder && props.table?.orderType === "POSTPAID"
              ? "bg-primary/10 text-primary"
              : "",
            !disabled && props.table?.hasOrder && props.table?.orderType === "PREPAID"
              ? "bg-[#2E8CFF]/10 text-[#2E8CFF]"
              : "",
            disabled && "bg-gray-500/60 text-gray-300"
          )}
        >
          {props.table?.hasOrder
            ? ORDER_TYPE_TEXT[props.table?.orderType as keyof typeof ORDER_TYPE_TEXT]
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
            {props.table?.orderedAt || "00:00"}
          </time>
          <time
            className={cn(
              "text-gray-0 flex h-9 items-center justify-center gap-1.5 rounded-3xl px-4 py-1 text-[15px] font-normal",
              disabled ? "text-gray-300" : "bg-gray-700"
            )}
          >
            <StopwatchIcon width={20} height={20} color="#222222" />
            {props.table?.orderedAt || "00:00"}
          </time>
        </div>
      </header>
      <h2
        className={cn(
          "items-center font-bold md:text-3xl lg:text-4xl",
          disabled ? "text-gray-300" : "text-gray-0"
        )}
      >
        {props.table?.tableNo}번 테이블
      </h2>
      <section className="flex w-full flex-row items-start gap-8">
        <div className="flex flex-1 flex-col items-start gap-[11px]">
          <span className={cn("text-sm font-normal", disabled ? "text-gray-300" : "text-gray-0")}>
            주문한 메뉴
          </span>
          <p className={cn("text-xl font-semibold", disabled ? "text-gray-300" : "text-gray-0")}>
            {(props.table?.orderMenuCount ?? 0) > 0 ? (
              <div className="flex items-end gap-1.5">
                <strong className="text-xl font-semibold">{props.table?.orderMenuName}</strong>
                {(props.table?.orderMenuCount ?? 0) > 1 && (
                  <span className="text-s mb-0.5">
                    외 {(props.table?.orderMenuCount ?? 0) - 1}개
                  </span>
                )}
              </div>
            ) : (
              <strong className={cn("text-xl", disabled ? "text-gray-300" : "text-gray-0")}>
                -
              </strong>
            )}
          </p>
        </div>
        <div className="flex w-[140px] flex-col items-start gap-[11px]">
          <span className={cn("text-sm font-normal", disabled ? "text-gray-300" : "text-gray-0")}>
            총 주문금액
          </span>
          <p className={cn("text-xl font-semibold", disabled ? "text-gray-300" : "text-gray-0")}>
            {props.table?.totalOrderPrice
              ? `${props.table?.totalOrderPrice?.toLocaleString()}원`
              : "-"}
          </p>
        </div>
      </section>
    </button>
  );
}

export default PosTablesBoxComp;
