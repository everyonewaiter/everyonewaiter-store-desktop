import { Button } from "@renderer/components";
import { ColorName } from "@renderer/constants";

function WaitingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh w-full bg-gray-700">
      <header className="flex flex-col gap-6 pt-10 md:px-12 lg:px-15">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-3xl font-bold text-black">웨이팅 관리</h1>
          <div className="relative">
            <Button color={ColorName.GREY} className="button-xl !bg-gray-300 !text-white">
              홀 관리 이동
            </Button>
            <div className="bg-primary absolute -top-5 -right-5 flex h-10 w-10 items-center justify-center rounded-full text-xl font-semibold text-white">
              4
            </div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-gray-400" />
      </header>
      <div className="flex flex-col gap-2 py-8 md:px-12 lg:px-15">{children}</div>
    </div>
  );
}

export default WaitingLayout;
