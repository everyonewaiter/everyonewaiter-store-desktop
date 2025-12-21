import { useNavigate } from "react-router-dom";
import { Button } from "@renderer/components";
import { ColorName } from "@renderer/constants";
import WaitingActionButtons from "@renderer/pages/hall/waiting/HallWaitingActionButtonsComp";
import HallWaitingInfoComp from "@renderer/pages/hall/waiting/HallWaitingInfoComp";
import HallWaitingNumberingComp from "@renderer/pages/hall/waiting/HallWaitingNumberingComp";
import { useGetHallOrders } from "@renderer/queries/useGetHallOrders";
import { useGetHallStaffCalls } from "@renderer/queries/useGetHallStaffCalls";
import { useGetHallWaitings } from "@renderer/queries/useGetHallWaitings";

function HallWaitingPage() {
  const navigate = useNavigate();

  const { waitings } = useGetHallWaitings();
  const { orders } = useGetHallOrders();
  const { staffCalls } = useGetHallStaffCalls();

  return (
    <div className="min-h-dvh w-full bg-gray-700">
      <header className="flex flex-col gap-6 pt-10 md:px-12 lg:px-15">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-3xl font-bold text-black">웨이팅 관리</h1>
          <div className="relative">
            <Button
              color={ColorName.GREY}
              className="button-xl !bg-gray-300 !text-white"
              onClick={() => navigate("/hall")}
            >
              홀 관리 이동
            </Button>
            <div className="bg-primary absolute -top-5 -right-5 flex h-10 w-10 items-center justify-center rounded-full text-xl font-semibold text-white">
              {staffCalls.length + orders.unserved.length}
            </div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-gray-400" />
      </header>
      <div className="flex flex-col gap-2 py-8 md:px-12 lg:px-15">
        {waitings.map((waiting, index) => (
          <article
            key={waiting.waitingId}
            className="flex w-full items-center gap-[25px] md:min-h-[260px] lg:min-h-[225px]"
          >
            <HallWaitingNumberingComp index={index} />
            <section className="flex h-full flex-1 gap-2">
              <aside className="flex w-40 flex-col items-center justify-center gap-2 rounded-2xl bg-white">
                <span className="text-lg font-medium">대기 번호</span>
                <strong className="text-4xl font-bold">
                  {String(waiting.number).padStart(3, "0")}
                </strong>
              </aside>
              <main className="flex flex-1 items-center justify-between rounded-2xl bg-white md:px-8 md:py-6 lg:px-10 lg:py-8">
                <HallWaitingInfoComp waiting={waiting} />
                <WaitingActionButtons waiting={waiting} />
              </main>
            </section>
          </article>
        ))}
      </div>
    </div>
  );
}

export default HallWaitingPage;
