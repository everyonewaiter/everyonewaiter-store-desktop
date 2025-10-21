import { Fragment } from "react/jsx-runtime";
import { PlusIcon } from "@renderer/assets/icons";
import { Checkbox } from "@renderer/components";
import { Menu, OrderMenu } from "@renderer/types/domain";

function PosPaymentsOrderBoxComp({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

PosPaymentsOrderBoxComp.Order = function Order({
  orderMenu,
}: {
  orderMenu: OrderMenu | (Menu & { quantity: number });
}) {
  const normalizeMenuItem = (
    item: OrderMenu | (Menu & { quantity: number })
  ): {
    name: string;
    quantity: number;
    optionGroups: {
      id: string;
      name: string;
      options: { name: string; price: number }[];
    }[];
  } => {
    if ("orderMenuId" in item) {
      return {
        name: item.name,
        quantity: item.quantity,
        optionGroups: item.orderOptionGroups.map((group) => ({
          id: group.orderOptionGroupId,
          name: group.name,
          options: group.orderOptions,
        })),
      };
    } else {
      return {
        name: item.name,
        quantity: item.quantity,
        optionGroups: item.menuOptionGroups.map((group) => ({
          id: group.menuOptionGroupId,
          name: group.name,
          options: group.menuOptions,
        })),
      };
    }
  };

  const normalized = normalizeMenuItem(orderMenu);

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-gray-600 p-4">
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium text-gray-100">{normalized.name}</span>
        <span className="text-lg font-medium text-gray-100">{normalized.quantity}개</span>
      </div>
      <div className="flex flex-col gap-1">
        {normalized.optionGroups.map((group) =>
          group.options.map((option) => (
            <div key={group.id} className="flex items-center justify-between">
              <span className="flex text-base font-medium text-[#2E7BB3]">
                <PlusIcon width={24} height={24} color="#2E7BB3" />
                {group.name}
              </span>
              <span className="flex text-base font-medium text-[#2E7BB3]">{option.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

PosPaymentsOrderBoxComp.Menu = function Menu({ menu, quantity }: { menu: Menu; quantity: number }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-gray-600 p-4">
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium text-gray-100">{menu.name}</span>
        <span className="text-lg font-medium text-gray-100">{quantity}개</span>
      </div>
      <div className="flex flex-col gap-1">
        {menu.menuOptionGroups.map((optionGroup) =>
          optionGroup.menuOptions.map((option) => (
            <div key={optionGroup.menuOptionGroupId} className="flex items-center justify-between">
              <Fragment>
                <span className="flex text-base font-medium text-[#2E7BB3]">
                  <PlusIcon width={24} height={24} color="#2E7BB3" />
                  {optionGroup.name}
                </span>
                <span className="flex text-base font-medium text-[#2E7BB3]">{option.name}</span>
              </Fragment>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

PosPaymentsOrderBoxComp.Index = function Number({
  index,
  hasCheckbox = false,
}: {
  index: number;
  hasCheckbox?: boolean;
}) {
  return (
    <div className="relative flex items-center gap-3">
      {hasCheckbox && <Checkbox size={24} />}
      <strong className="text-gray-0 text-2xl font-semibold">{index + 1}</strong>
    </div>
  );
};

PosPaymentsOrderBoxComp.Divider = function Divider() {
  return (
    <div className="w-full py-6">
      <div className="h-[1px] w-full bg-gray-600" />
    </div>
  );
};

export default PosPaymentsOrderBoxComp;
