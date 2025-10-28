import { MinusIcon, PlusIcon } from "@renderer/assets/icons";
import { Button } from "@renderer/components";
import { Dialog } from "@renderer/components/Dialog";
import PosTablesDetailOrderBoxComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailorderBoxComp";
import { Menu } from "@renderer/types/domain";
import { ModalProps } from "@renderer/types/overlay";

const MENU_LABEL = {
  BEST: "인기",
  NEW: "신규",
  RECOMMEND: "추천",
} as const;

interface PosTablesDetailMenuModalCompProps extends ModalProps {
  menu: Menu;
}

function PosTablesDetailMenuModalComp({ menu, ...props }: PosTablesDetailMenuModalCompProps) {
  const requiredOptions = menu.menuOptionGroups.filter((group) => group.type === "MANDATORY");
  const optionalOptions = menu.menuOptionGroups.filter((group) => group.type === "OPTIONAL");

  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper width={1002} flexDirection="row" height={650} className="p-6">
        <div className="h-full flex-1 overflow-hidden rounded-[28px]">
          <img
            src={menu.image || "./src/assets/images/pos-bg.jpg"}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="scrollbar-hide relative flex h-full w-full flex-1 flex-col overflow-y-auto">
          <div className="flex flex-1 flex-col gap-8">
            <div className="flex flex-col gap-5">
              {menu.label !== "DEFAULT" && (
                <Button variant="outline" className="h-10 w-fit rounded-[40px] px-5">
                  {MENU_LABEL[menu.label]}
                </Button>
              )}

              <div className="flex flex-col gap-4">
                <h1 className="text-gray-0 text-3xl font-bold">{menu.name}</h1>
                <span className="text-gray-0 text-lg font-normal">{menu.description}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex h-11 w-12 cursor-pointer items-center justify-center rounded-xl border border-gray-600"
                  >
                    <MinusIcon className="h-9 w-9 text-gray-300" />
                  </button>
                  <span className="px-2 py-1 text-2xl font-normal">1</span>
                  <button
                    type="button"
                    className="flex h-11 w-12 cursor-pointer items-center justify-center rounded-xl border border-gray-600"
                  >
                    <PlusIcon className="h-9 w-9 text-gray-300" />
                  </button>
                </div>
                <strong className="text-gray-0 text-3xl font-bold">
                  {menu.price.toLocaleString()}원
                </strong>
              </div>
            </div>

            <div className="my-5 h-[8px] w-full bg-gray-700" />

            <section className="flex flex-col gap-4">
              {requiredOptions?.length > 0 && (
                <PosTablesDetailOrderBoxComp options={requiredOptions} type="required" />
              )}
              {optionalOptions?.length > 0 && (
                <PosTablesDetailOrderBoxComp options={optionalOptions} type="optional" />
              )}
            </section>
          </div>
          <div className="sticky bottom-0 left-0 w-full bg-white pt-6">
            <Button className="button-xl w-full">
              총 {menu.price.toLocaleString()}원
              <div className="h-1 w-1 rounded-full bg-white/60" />
              메뉴 추가
            </Button>
          </div>
        </div>
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosTablesDetailMenuModalComp;
