import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogoIcon, LogoSquaredIcon, LogoTextIcon } from "@renderer/assets/logos";

function DeviceLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = async () => {
      const creds = await window.storageAPI?.getDeviceInfo?.();
      if (creds?.deviceType) {
        navigate(`/${creds?.deviceType.toLowerCase()}`);
      }
    };

    isLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-dvh w-dvw bg-gray-700">
      <header className="flex w-full flex-col md:gap-3 md:px-7.5 md:pt-5 lg:gap-6 lg:px-15 lg:pt-7">
        <button
          type="button"
          className="flex w-fit cursor-pointer items-center gap-3 md:h-10 lg:h-15"
        >
          <LogoIcon className="md:h-10 md:w-10 lg:h-15 lg:w-15" />
          <LogoTextIcon className="md:h-[19px] lg:h-[25px]" />
        </button>
        <div className="h-[1px] w-full bg-gray-500" />
      </header>
      <div className="flex items-center justify-center md:h-[calc(100dvh-73px)] lg:h-[calc(100dvh-113px)]">
        <div className="flex flex-col bg-white md:w-[364px] md:gap-6 md:rounded-3xl md:p-5 lg:w-[544px] lg:gap-12 lg:rounded-4xl lg:p-8">
          <div className="flex flex-col md:gap-4 lg:gap-10">
            <LogoSquaredIcon className="md:h-15 md:w-15 lg:h-22.5 lg:w-22.5" />
            <div className="flex flex-col md:gap-2 lg:gap-3">
              <h1 className="text-gray-0 font-bold md:text-2xl lg:text-4xl">기기 등록</h1>
              <div className="flex flex-col">
                <span className="md:text-s font-normal text-gray-300 lg:text-[15px]">
                  첫 매장을 등록해볼까요?
                </span>
                <span className="md:text-s font-normal text-gray-300 lg:text-[15px]">
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

export default DeviceLayout;
