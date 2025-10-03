import { useState } from "react";
import { Button } from "@renderer/components";
import HallLayout from "@renderer/pages/hall/HallLayout";
import HallOrderComp from "@renderer/pages/hall/HallOrderComp";
import HallStaffCallComp from "@renderer/pages/hall/HallStaffCallComp";
import MOCK from "@renderer/pages/hall/mock";

function HallPage() {
  const [served, setServed] = useState(false);

  return (
    <HallLayout>
      <section className="flex flex-row gap-3 rounded-2xl bg-white px-4 py-3">
        {/* TODO: 주문/완료 상태에 따라 버튼 스타일 관리 */}
        <Button color="black" className="button-xl !px-8" onClick={() => setServed(false)}>
          주문 {MOCK.unserved.length}건
        </Button>
        <Button
          color="grey"
          variant="outline"
          className="button-xl !border-gray-500 !px-8"
          onClick={() => setServed(true)}
        >
          완료 {MOCK.served.length}건
        </Button>
      </section>
      {!served && MOCK.staffCalls.length > 0 && (
        <section className="flex flex-col gap-6 rounded-2xl border border-gray-600 bg-white p-6">
          <div className="flex items-center gap-2">
            <h1 className="text-gray-0 text-2xl font-semibold">호출 내역</h1>
            <div className="text-gray-0 flex h-8 w-8 items-center justify-center rounded-3xl bg-gray-700 text-xl font-semibold">
              {MOCK.staffCalls.length}
            </div>
          </div>
          <div className="flex flex-row gap-6 overflow-x-auto">
            {MOCK.staffCalls.map((staffCall) => (
              <HallStaffCallComp key={staffCall.staffCallId} staffCall={staffCall} />
            ))}
          </div>
        </section>
      )}
      {!served && MOCK.unserved.length > 0 && (
        <section className="flex h-full w-full flex-col gap-6 rounded-2xl border border-gray-600 bg-white p-6">
          {MOCK.unserved.map((order) => (
            <HallOrderComp key={order.orderId} order={order} />
          ))}
        </section>
      )}
      {served && MOCK.served.length > 0 && (
        <section className="flex h-full w-full flex-col gap-6 rounded-2xl border border-gray-600 bg-white p-6">
          {MOCK.served.map((order) => (
            <HallOrderComp key={order.orderId} order={order} />
          ))}
        </section>
      )}
    </HallLayout>
  );
}

export default HallPage;
