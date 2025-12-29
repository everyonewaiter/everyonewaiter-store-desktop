import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoIcon, LogoTextIcon } from "@renderer/assets/logos";
import Button from "@renderer/components/Button/Button";
import { ColorName } from "@renderer/constants/ui";
import { useGetHallOrders } from "@renderer/hooks/useGetHallOrders";
import { useGetHallStaffCalls } from "@renderer/hooks/useGetHallStaffCalls";
import { useGetHallWaitings } from "@renderer/hooks/useGetHallWaitings";
import HallActionCompleteModalComp from "@renderer/pages/hall/order/HallActionCompleteModalComp";
import HallOrderComp from "@renderer/pages/hall/order/HallOrderComp";
import HallStaffCallComp from "@renderer/pages/hall/order/HallStaffCallComp";
import { overlay } from "overlay-kit";

function HallOrderPage() {
  const navigate = useNavigate();
  const [served, setServed] = useState(false);

  const { waitings } = useGetHallWaitings();
  const { orders } = useGetHallOrders();
  const { staffCalls } = useGetHallStaffCalls();

  const tabs = [
    { isServed: false, label: "주문", count: orders.unserved.length },
    { isServed: true, label: "완료", count: orders.served.length },
  ];

  return (
    <div className="min-h-dvh w-full bg-gray-700">
      <header className="flex flex-row items-center justify-between bg-white px-15 pt-10 pb-8">
        <button type="button" className="flex w-fit cursor-pointer items-center gap-5">
          <LogoIcon className="h-15 w-15" />
          <LogoTextIcon className="h-[25px]" />
        </button>
        <div className="relative">
          <Button
            color={ColorName.GREY}
            className="button-xl !bg-gray-300 !text-white"
            onClick={() => navigate("/waiting")}
          >
            웨이팅 관리 이동
          </Button>
          <div className="bg-primary absolute -top-5 -right-5 flex h-10 w-10 items-center justify-center rounded-full text-xl font-semibold text-white">
            {waitings.length}
          </div>
        </div>
      </header>
      <div className="flex flex-col gap-4 px-15 py-8">
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
        {!served && staffCalls.length > 0 && (
          <section className="flex flex-col gap-6 rounded-2xl border border-gray-600 bg-white p-6">
            <div className="flex items-center gap-2">
              <h1 className="text-gray-0 text-2xl font-semibold">호출 내역</h1>
              <div className="text-gray-0 flex h-8 w-8 items-center justify-center rounded-3xl bg-gray-700 text-xl font-semibold">
                {staffCalls.length}
              </div>
            </div>
            <div className="flex flex-row gap-6 overflow-x-auto">
              {staffCalls.map((staffCall) => (
                <HallStaffCallComp
                  key={staffCall.staffCallId}
                  staffCall={staffCall}
                  onClick={() =>
                    overlay.open((overlayProps) => (
                      <HallActionCompleteModalComp
                        type="call"
                        tableNo={staffCall.tableNo}
                        resourceId={staffCall.staffCallId}
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
        {!served && orders.unserved.length > 0 && (
          <section className="flex h-full w-full flex-col gap-6 rounded-2xl border border-gray-600 bg-white p-6">
            {orders.unserved.map((order) => (
              <HallOrderComp key={order.orderId} order={order} />
            ))}
          </section>
        )}
        {served && orders.served.length > 0 && (
          <section className="flex h-full w-full flex-col gap-6 rounded-2xl border border-gray-600 bg-white p-6">
            {orders.served.map((order) => (
              <HallOrderComp key={order.orderId} order={order} />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default HallOrderPage;
