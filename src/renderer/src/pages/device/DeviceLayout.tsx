import { LogoIcon, LogoSquaredIcon, LogoTextIcon } from "@renderer/assets/logos";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh w-dvw bg-gray-700">
      <header className="flex w-full flex-col gap-6 px-15 pt-7">
        <button type="button" className="flex h-15 w-fit cursor-pointer items-center gap-3">
          <LogoIcon className="h-15 w-15" />
          <LogoTextIcon className="h-[25px]" />
        </button>
        <div className="h-[1px] w-full bg-gray-500" />
      </header>
      <div className="flex h-[calc(100dvh-113px)] items-center justify-center">
        <div className="flex flex-col bg-white md:w-[364px] md:gap-6 md:rounded-3xl md:p-5 lg:w-[544px] lg:gap-12 lg:rounded-4xl lg:p-8">
          <div className="flex flex-col md:gap-4 lg:gap-10">
            <LogoSquaredIcon className="md:h-15 md:w-15 lg:h-22.5 lg:w-22.5" />
            <div className="flex flex-col md:gap-2 lg:gap-3">
              <h1 className="text-gray-0 font-bold md:text-2xl lg:text-4xl">기기 등록</h1>
              <div className="flex flex-col">
                <span className="font-regular md:text-s text-gray-300 lg:text-[15px]">
                  첫 매장을 등록해볼까요?
                </span>
                <span className="font-regular md:text-s text-gray-300 lg:text-[15px]">
                  간단한 정보만 입력하면 바로 시작할 수 있어요!
                </span>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
