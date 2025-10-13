import { AlarmIcon, StopwatchIcon } from "@renderer/assets/icons";
import { ORDER_TYPE_TEXT } from "@renderer/constants/pos";
import { PosTableMockType } from "@renderer/pages/pos/mock";
import cn from "@renderer/utils/cn";

export default function PosTablesBoxComp(props: PosTableMockType) {
  return (
    <button
      type="button"
      className={cn(
        "flex aspect-[432/320] cursor-pointer flex-col items-start justify-between rounded-3xl border-2 p-7",
        props.hasOrder ? "border-primary" : "border-gray-500"
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div
          className={cn(
            "flex h-9 items-center justify-center rounded-3xl bg-gray-700 px-4 py-1 text-[15px] font-normal text-gray-300",
            props.hasOrder && props.orderType === "POSTPAID" ? "bg-primary/10 text-primary" : "",
            props.hasOrder && props.orderType === "PREPAID" ? "bg-[#2E8CFF]/10 text-[#2E8CFF]" : ""
          )}
        >
          {props.hasOrder ? ORDER_TYPE_TEXT[props.orderType] : "대기"}
        </div>
        <div className="flex items-center gap-2">
          <div className="text-gray-0 flex h-9 items-center justify-center gap-1.5 rounded-3xl bg-gray-700 px-4 py-1 text-[15px] font-normal">
            <AlarmIcon width={20} height={20} color="#222222" />
            {props.orderedAt ?? "00:00"}
          </div>
          <div className="text-gray-0 flex h-9 items-center justify-center gap-1.5 rounded-3xl bg-gray-700 px-4 py-1 text-[15px] font-normal">
            <StopwatchIcon width={20} height={20} color="#222222" />
            {props.orderedAt ?? "00:00"}
          </div>
        </div>
      </div>
      <strong className="text-gray-0 items-center font-bold md:text-3xl lg:text-4xl">
        {props.tableNo}번 테이블
      </strong>
      <div className="flex w-full flex-row items-start gap-8">
        <div className="flex flex-1 flex-col items-start gap-[11px]">
          <span className="text-gray-0 text-sm font-normal">주문한 메뉴</span>
          <strong className="text-gray-0 text-xl font-semibold">
            {props.orderMenuName ?? "-"}
          </strong>
        </div>
        <div className="flex w-[140px] flex-col items-start gap-[11px]">
          <span className="text-gray-0 text-sm font-normal">총 주문금액</span>
          <strong className="text-gray-0 text-xl font-semibold">
            {props.totalOrderPrice ? `${props.totalOrderPrice?.toLocaleString()}원` : "-"}
          </strong>
        </div>
      </div>
    </button>
  );
}
