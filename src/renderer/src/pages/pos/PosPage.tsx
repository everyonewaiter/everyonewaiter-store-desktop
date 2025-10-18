import posBgImage from "@renderer/assets/images/pos-bg.jpg";
import { Button } from "@renderer/components";

function PosPage() {
  return (
    <main className="flex h-dvh w-dvw items-center justify-center">
      <div className="absolute top-0 left-0 h-full w-full bg-black/40" />
      <div className="absolute top-0 left-0 flex w-full justify-end px-15 py-10">
        <div className="flex items-center gap-1 rounded-[80px] bg-white/16 px-4 py-2.5">
          <div className="bg-primary flex items-center justify-center rounded-3xl px-6 py-2 text-xl font-normal text-white">
            오픈
          </div>
          <div className="flex items-center justify-center rounded-3xl px-6 py-2 text-xl font-normal text-gray-300">
            마감
          </div>
        </div>
      </div>
      <img src={posBgImage} alt="POS 시스템 배경" className="h-full w-full object-cover" />
      <section className="absolute flex flex-col gap-20 text-white">
        <header className="flex flex-col gap-4 text-center">
          <time className="text-2xl font-normal text-white">2025년 02월 27일 목요일</time>
          <h1 className="text-5xl font-bold text-white">안녕하세요, [매장명] 입니다.</h1>
        </header>
        <nav className="flex w-[659px] flex-col gap-4">
          <Button
            color="black"
            className="bg-gray-0 h-30 rounded-2xl border-none text-3xl font-bold text-white"
          >
            POS
          </Button>
          <Button
            variant="outline"
            className="h-18 rounded-2xl border-white text-2xl font-bold text-white"
          >
            결제내역
          </Button>
          <Button
            variant="outline"
            className="h-18 rounded-2xl border-white text-2xl font-bold text-white"
          >
            매출액
          </Button>
        </nav>
      </section>
    </main>
  );
}

export default PosPage;
