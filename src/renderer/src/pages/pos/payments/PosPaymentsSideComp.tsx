import { Button } from "@renderer/components";
import { PosOrderType } from "@renderer/pages/pos/mock";
import PosPaymentsOrderBoxComp from "@renderer/pages/pos/payments/PosPaymentsOrderBoxComp";
import cn from "@renderer/utils/cn";

export default function PosPaymentsSideComp({ data }: { data: PosOrderType }) {
  return (
    <aside
      className="sticky top-0 right-0 flex h-[calc(100dvh-133px)] flex-[0.3375] flex-col gap-8 overflow-y-hidden rounded-tl-[40px] rounded-bl-[40px] px-8 pt-10 pb-8"
      style={{ boxShadow: "-2px 0px 20px 0px rgba(0, 0, 0, 0.08)" }}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "h-12 rounded-[80px] border-none px-5 py-3",
            data.orderId
              ? "bg-primary/8 text-primary"
              : "bg-gray-700 text-xl font-medium text-gray-300"
          )}
        >
          {data.orderId ?? "-"}
        </div>
        <h2 className="text-gray-0 text-[28px] font-bold">주문 내역</h2>
      </div>
      <section className="flex h-[calc(100%-8px-8px-24px-62px)] flex-col gap-4 overflow-y-auto">
        {data.orderMenus.map((item, index, arr) => (
          <article key={item.orderMenuId}>
            <PosPaymentsOrderBoxComp>
              <PosPaymentsOrderBoxComp.Index index={index} hasCheckbox />
              <PosPaymentsOrderBoxComp.Order order={item} />
              {index !== arr.length - 1 && <PosPaymentsOrderBoxComp.Divider />}
            </PosPaymentsOrderBoxComp>
          </article>
        ))}
      </section>
      <div className="flex h-16 items-center gap-3">
        <Button
          variant="outline"
          color={data.orderId ? "black" : "grey"}
          className={cn(
            "h-full w-fit rounded-xl px-8 font-semibold",
            data.orderId ? "text-gray-200" : "border-gray-500 text-gray-500"
          )}
          disabled={!data.orderId}
        >
          결제 취소하기
        </Button>
        <Button
          color="black"
          className={cn(
            "h-full w-full rounded-xl px-8 font-semibold text-white",
            data.orderId ? "bg-gray-0" : "bg-gray-500"
          )}
          disabled={!data.orderId}
        >
          영수증 출력하기
        </Button>
      </div>
    </aside>
  );
}
