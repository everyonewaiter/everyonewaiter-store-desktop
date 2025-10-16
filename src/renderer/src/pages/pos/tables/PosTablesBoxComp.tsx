import { AlarmIcon, StopwatchIcon } from "@renderer/assets/icons";
import { ORDER_TYPE_TEXT } from "@renderer/constants/pos";
import { Tables } from "@renderer/types/domain";
import cn from "@renderer/utils/cn";

function PosTablesBoxComp(props: Tables) {
  return (
    <article
      className={cn(
        "flex aspect-[432/320] cursor-pointer flex-col items-start justify-between rounded-3xl border-2 border-gray-500 p-7",
        props.hasOrder && props.orderType === "POSTPAID" ? "border-primary" : "",
        props.hasOrder && props.orderType === "PREPAID" ? "border-[#2E8CFF]" : ""
      )}
    >
      <header className="flex w-full items-center justify-between">
        <div
          className={cn(
            "flex h-9 items-center justify-center rounded-3xl bg-gray-700 px-4 py-1 text-[15px] font-normal text-gray-300",
            props.hasOrder && props.orderType === "POSTPAID" ? "bg-primary/10 text-primary" : "",
            props.hasOrder && props.orderType === "PREPAID" ? "bg-[#2E8CFF]/10 text-[#2E8CFF]" : ""
          )}
        >
          {props.hasOrder
            ? ORDER_TYPE_TEXT[props.orderType as keyof typeof ORDER_TYPE_TEXT]
            : "대기"}
        </div>
        <div className="flex items-center gap-2">
          <time className="text-gray-0 flex h-9 items-center justify-center gap-1.5 rounded-3xl bg-gray-700 px-4 py-1 text-[15px] font-normal">
            <AlarmIcon width={20} height={20} color="#222222" />
            {props.orderedAt || "00:00"}
          </time>
          <time className="text-gray-0 flex h-9 items-center justify-center gap-1.5 rounded-3xl bg-gray-700 px-4 py-1 text-[15px] font-normal">
            <StopwatchIcon width={20} height={20} color="#222222" />
            {props.orderedAt || "00:00"}
          </time>
        </div>
      </header>
      <h2 className="text-gray-0 items-center font-bold md:text-3xl lg:text-4xl">
        {props.tableNo}번 테이블
      </h2>
      <section className="flex w-full flex-row items-start gap-8">
        <div className="flex flex-1 flex-col items-start gap-[11px]">
          <span className="text-gray-0 text-sm font-normal">주문한 메뉴</span>
          <p className="text-gray-0 text-xl font-semibold">
            {props.orderMenuCount > 0 ? (
              <div className="flex items-end gap-1.5">
                <strong className="text-xl font-semibold">{props.orderMenuName}</strong>
                {props.orderMenuCount > 1 && (
                  <span className="text-s mb-0.5">외 {props.orderMenuCount - 1}개</span>
                )}
              </div>
            ) : (
              <strong className="text-xl">-</strong>
            )}
          </p>
        </div>
        <div className="flex w-[140px] flex-col items-start gap-[11px]">
          <span className="text-gray-0 text-sm font-normal">총 주문금액</span>
          <p className="text-gray-0 text-xl font-semibold">
            {props.totalOrderPrice ? `${props.totalOrderPrice?.toLocaleString()}원` : "-"}
          </p>
        </div>
      </section>
    </article>
  );
}

export default PosTablesBoxComp;
