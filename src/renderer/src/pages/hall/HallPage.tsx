import { Button } from "@renderer/components";
import HallLayout from "@renderer/pages/hall/HallLayout";
import HallOrderComp from "@renderer/pages/hall/HallOrderComp";
import HallStaffCallComp from "@renderer/pages/hall/HallStaffCallComp";

function HallPage() {
  return (
    <HallLayout>
      <section className="flex flex-row gap-3 rounded-2xl bg-white px-4 py-3">
        <Button color="black" className="button-xl !px-8">
          주문 12건
        </Button>
        <Button color="grey" variant="outline" className="button-xl !border-gray-500 !px-8">
          완료 2건
        </Button>
      </section>
      <section className="flex flex-col gap-6 rounded-2xl border border-gray-600 bg-white p-6">
        <div className="flex items-center gap-2">
          <h1 className="text-gray-0 text-2xl font-semibold">호출 내역</h1>
          <div className="text-gray-0 flex h-8 w-8 items-center justify-center rounded-3xl bg-gray-700 text-xl font-semibold">
            4
          </div>
        </div>
        <div className="flex flex-row gap-6 overflow-x-auto">
          <HallStaffCallComp />
          <HallStaffCallComp />
        </div>
      </section>
      <section className="flex h-full w-full flex-col gap-6 rounded-2xl border border-gray-600 bg-white p-6">
        <HallOrderComp />
        <HallOrderComp />
        <HallOrderComp />
      </section>
    </HallLayout>
  );
}

export default HallPage;
