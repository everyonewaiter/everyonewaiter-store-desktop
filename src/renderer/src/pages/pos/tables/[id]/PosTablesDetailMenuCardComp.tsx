import { Menu } from "@renderer/types/domain";
import { overlay } from "overlay-kit";
import PosTablesDetailMenuModalComp from "./PosTablesDetailMenuModalComp";

interface PosTablesDetailMenuCardCompProps {
  menu: Menu;
}

function PosTablesDetailMenuCardComp({ menu }: PosTablesDetailMenuCardCompProps) {
  return (
    <button
      type="button"
      className="relative aspect-[270/340] cursor-pointer overflow-hidden rounded-3xl border-[1.5px] border-gray-600"
      onClick={() =>
        overlay.open((overlayProps) => (
          <PosTablesDetailMenuModalComp {...overlayProps} menu={menu} />
        ))
      }
    >
      {menu.state === "SOLD_OUT" && (
        <div className="absolute z-50 flex h-full w-full items-center justify-center bg-black/70 text-2xl font-semibold text-white">
          SOLD OUT
        </div>
      )}
      <img
        src={menu.image || "./src/assets/images/pos-bg.jpg"}
        className="h-full w-full object-cover"
      />
      <div className="absolute bottom-0 flex w-full flex-col items-center justify-center gap-2 bg-white px-6 py-4">
        <span className="text-gray-0 text-lg leading-[27px] font-normal">{menu.name}</span>
        <strong className="text-gray-0 text-2xl leading-8 font-semibold">
          {menu.price.toLocaleString()}원
        </strong>
      </div>
    </button>
  );
}

export default PosTablesDetailMenuCardComp;
