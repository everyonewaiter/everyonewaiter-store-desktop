import { useState } from "react";
import { Button } from "@renderer/components";
import { ColorName } from "@renderer/constants";
import HallLayout from "@renderer/pages/hall/HallLayout";
import HallOrderComp from "@renderer/pages/hall/HallOrderComp";
import HallStaffCallComp from "@renderer/pages/hall/HallStaffCallComp";
import MOCK from "@renderer/pages/hall/mock";
import { overlay } from "overlay-kit";
import HallActionCompleteModalComp from "./HallActionCompleteModalComp";

const tabs = [
  { isServed: false, label: "주문", count: MOCK.unserved.length },
  { isServed: true, label: "완료", count: MOCK.served.length },
];

function HallPage() {
  const [served, setServed] = useState(false);

  return (
    <HallLayout>
      <section className="flex flex-row gap-3 rounded-2xl bg-white px-4 py-3">
        {tabs.map((tab) => (
          <Button
            key={tab.label}
            color={served === tab.isServed ? ColorName.BLACK : ColorName.GREY}
            variant={served === tab.isServed ? "default" : "outline"}
            className="button-xl !px-8 not-focus:!border-gray-500"
            onClick={() => setServed(tab.isServed)}
          >
            {tab.label} {tab.count}건
          </Button>
        ))}
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
              <HallStaffCallComp
                key={staffCall.staffCallId}
                staffCall={staffCall}
                onClick={() =>
                  overlay.open((overlayProps) => (
                    <HallActionCompleteModalComp
                      type="call"
                      tableNo={staffCall.tableNo}
                      staffCallText={staffCall.name}
                      {...overlayProps}
                    />
                  ))
                }
              />
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
