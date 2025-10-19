import MOCK from "@renderer/pages/waiting/mock";
import WaitingActionButtons from "@renderer/pages/waiting/WaitingActionButtonsComp";
import WaitingInfoComp from "@renderer/pages/waiting/WaitingInfoComp";
import WaitingLayout from "@renderer/pages/waiting/WaitingLayout";
import WaitingNumberingComp from "@renderer/pages/waiting/WaitingNumberingComp";

function WaitingPage() {
  return (
    <WaitingLayout>
      {MOCK.map((waiting, index) => (
        <article
          key={waiting.waitingId}
          className="flex w-full items-center gap-[25px] md:min-h-[260px] lg:min-h-[225px]"
        >
          <WaitingNumberingComp index={index} waitingList={MOCK} />
          <section className="flex h-full flex-1 gap-2">
            <aside className="flex w-40 flex-col items-center justify-center gap-2 rounded-2xl bg-white">
              <span className="text-lg font-medium">대기 번호</span>
              <strong className="text-4xl font-bold">
                {String(waiting.number).padStart(3, "0")}
              </strong>
            </aside>
            <main className="flex flex-1 items-center justify-between rounded-2xl bg-white md:px-8 md:py-6 lg:px-10 lg:py-8">
              <WaitingInfoComp waiting={waiting} />
              <WaitingActionButtons callCount={waiting.callCount} waiting={waiting} />
            </main>
          </section>
        </article>
      ))}
    </WaitingLayout>
  );
}

export default WaitingPage;
