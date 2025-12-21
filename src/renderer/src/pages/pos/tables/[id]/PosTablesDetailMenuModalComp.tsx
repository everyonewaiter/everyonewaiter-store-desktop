import { useState } from "react";
import { MinusIcon, PlusIcon } from "@renderer/assets/icons";
import { Button, CdnImage } from "@renderer/components";
import { Dialog } from "@renderer/components/Dialog";
import PosTablesDetailOptionalOptionComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailOptionalOptionComp";
import PosTablesDetailRequiredOptionComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailRequiredOptionComp";
import { usePosTablesDetailOrderStore } from "@renderer/pages/pos/tables/[id]/usePosTablesDetailOrderStore";
import { Menu, OrderMenuOption } from "@renderer/types/domain";
import { ModalProps } from "@renderer/types/overlay";

export type SelectedRequiredOption = Record<string, OrderMenuOption>;

export type SelectedOption = OrderMenuOption & {
  menuOptionGroupId: string;
};

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

  const [selectedRequired, setSelectedRequired] = useState<SelectedRequiredOption>(
    Object.fromEntries(
      requiredOptions.map((group) => [
        group.menuOptionGroupId,
        { name: group.menuOptions[0].name, price: group.menuOptions[0].price },
      ])
    )
  );
  const [selectedOptional, setSelectedOptional] = useState<SelectedOption[]>([]);
  const [quantity, setQuantity] = useState(1);

  const { addMenu } = usePosTablesDetailOrderStore();

  const allSelectedOptions: SelectedOption[] = [
    ...Object.entries(selectedRequired).map(([groupId, opt]) => ({
      ...opt,
      menuOptionGroupId: groupId,
    })),
    ...selectedOptional,
  ];
  const totalPrice = () =>
    (menu.price + allSelectedOptions.reduce((a, b) => a + b.price, 0)) * quantity;

  const handleAddMenu = () => {
    const groupedOptions = allSelectedOptions.reduce(
      (
        acc: { menuOptionGroupId: string; orderOptions: OrderMenuOption[] }[],
        option: SelectedOption
      ) => {
        const existing = acc.find((g) => g.menuOptionGroupId === option.menuOptionGroupId);
        const newOption = { name: option.name, price: option.price };
        if (existing) {
          existing.orderOptions.push(newOption);
        } else {
          acc.push({
            menuOptionGroupId: option.menuOptionGroupId,
            orderOptions: [newOption],
          });
        }
        return acc;
      },
      []
    );

    addMenu({
      menuId: menu.menuId,
      quantity,
      menuOptionGroups: groupedOptions.map((group) => ({
        menuOptionGroupId: group.menuOptionGroupId,
        name:
          menu.menuOptionGroups.find((g) => g.menuOptionGroupId === group.menuOptionGroupId)
            ?.name ?? "",
        orderOptions: group.orderOptions,
      })),
      totalPrice: totalPrice(),
    });
    props.close();
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper width={1002} flexDirection="row" height={650} className="p-6">
        <div className="h-full flex-1 overflow-hidden rounded-[28px]">
          <CdnImage
            src={menu.image}
            alt={`메뉴 ${menu.name}`}
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
                    className="flex h-11 w-12 cursor-pointer items-center justify-center rounded-xl border border-gray-600 disabled:cursor-not-allowed"
                    disabled={quantity === 1}
                    onClick={() => setQuantity(quantity - 1)}
                  >
                    <MinusIcon className="h-9 w-9 text-gray-300" />
                  </button>
                  <span className="px-2 py-1 text-2xl font-normal">{quantity}</span>
                  <button
                    type="button"
                    className="flex h-11 w-12 cursor-pointer items-center justify-center rounded-xl border border-gray-600"
                    onClick={() => setQuantity(quantity + 1)}
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
                <PosTablesDetailRequiredOptionComp
                  options={requiredOptions}
                  selectedOptions={selectedRequired}
                  setSelectedOptions={setSelectedRequired}
                />
              )}
              {optionalOptions?.length > 0 && (
                <PosTablesDetailOptionalOptionComp
                  options={optionalOptions}
                  selectedOptions={selectedOptional}
                  setSelectedOptions={setSelectedOptional}
                />
              )}
            </section>
          </div>
          <div className="sticky bottom-0 left-0 w-full bg-white pt-6">
            <Button className="button-xl w-full" onClick={handleAddMenu}>
              총 {totalPrice().toLocaleString()}원
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
