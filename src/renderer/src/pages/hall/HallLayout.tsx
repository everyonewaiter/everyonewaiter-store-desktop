import { LogoIcon, LogoTextIcon } from "@renderer/assets/logos";
import { Button } from "@renderer/components";
import { ColorName } from "@renderer/constants";

function HallLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh w-dvw bg-gray-700">
      <header className="flex flex-row items-center justify-between bg-white px-15 pt-10 pb-8">
        <button type="button" className="flex w-fit cursor-pointer items-center gap-5">
          <LogoIcon className="h-15 w-15" />
          <LogoTextIcon className="h-[25px]" />
        </button>
        <div className="relative">
          <Button color={ColorName.GREY} className="button-xl !bg-gray-300 !text-white">
            웨이팅 관리 이동
          </Button>
          <div className="bg-primary absolute -top-5 -right-5 flex h-10 w-10 items-center justify-center rounded-full text-xl font-semibold text-white">
            4
          </div>
        </div>
      </header>
      <div className="flex flex-col gap-4 px-15 py-8">{children}</div>
    </div>
  );
}

export default HallLayout;
