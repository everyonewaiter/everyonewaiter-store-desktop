import { Button } from "@renderer/components";
import HallOrderBoxComp from "@renderer/pages/hall/HallOrderBoxComp";

interface HallOrderCompProps {
  isCompleted?: boolean;
}

function HallOrderComp({ isCompleted = false }: HallOrderCompProps) {
  return (
    <div className="flex h-full w-full flex-row gap-6">
      <div className="flex flex-[0.2] flex-col rounded-3xl border border-gray-600 p-6">
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-3">
          <div className="absolute top-0 flex w-full flex-col gap-2.5">
            <div className="flex h-[51px] w-full items-center justify-center rounded-xl border border-gray-600">
              주문 시간 PM 02:23
            </div>
            {isCompleted && (
              <div className="flex h-[51px] w-full items-center justify-center rounded-xl border border-gray-600">
                완료 시간 PM 02:23
              </div>
            )}
          </div>
          <div className="flex flex-col items-center">
            {!isCompleted && (
              <Button variant="outline" className="button-sm !rounded-4xl !text-sm">
                주문
              </Button>
            )}
            <span className="text-gray-0 pt-6 text-lg font-medium">테이블 번호</span>
            <strong className="text-gray-0 pt-3 text-4xl font-bold">01</strong>
          </div>
          {!isCompleted && (
            <Button color="black" className="button-lg absolute bottom-0 w-full">
              전체 완료
            </Button>
          )}
        </div>
      </div>
      <div className="flex h-full flex-[0.8] rounded-3xl border border-gray-600 p-6">
        <div className="flex w-full flex-col gap-4">
          <div className="text-gray-0 flex h-[58px] w-full items-center rounded-xl bg-gray-700 px-5 text-2xl font-semibold">
            메모:
          </div>
          <div className="grid w-full gap-x-2.5 gap-y-4 md:grid-cols-3 lg:grid-cols-4">
            <HallOrderBoxComp />
            <HallOrderBoxComp isServed />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HallOrderComp;
