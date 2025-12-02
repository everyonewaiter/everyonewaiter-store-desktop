import WaitingActionButtons from "@renderer/pages/hall/waiting/HallWaitingActionButtonsComp";
import HallWaitingInfoComp from "@renderer/pages/hall/waiting/HallWaitingInfoComp";
import HallWaitingLayout from "@renderer/pages/hall/waiting/HallWaitingLayout";
import HallWaitingNumberingComp from "@renderer/pages/hall/waiting/HallWaitingNumberingComp";
import { useGetHallWaitings } from "@renderer/queries/useGetHallWaitings";

function HallWaitingPage() {
  const { waitings } = useGetHallWaitings();

  return (
    <HallWaitingLayout>
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
    </HallWaitingLayout>
  );
}

export default HallWaitingPage;
