import { DeleteIcon, MinusIcon, PlusIcon } from "@renderer/assets/icons";
import { Checkbox } from "@renderer/components";
import { useGetMenus } from "@renderer/pages/pos/tables/[id]/usePosTablesDetailApi";
import { useGetDevice } from "@renderer/queries/useGetDevice";
import { CreateOrderMenu, OrderMenu } from "@renderer/types/domain";
import cn from "@renderer/utils/cn";

function PosPaymentsOrderBoxComp({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-3">{children}</div>;
}

PosPaymentsOrderBoxComp.Order = function Order({
  orderMenu,
  onUpdateOrder,
}: {
  orderMenu: OrderMenu | CreateOrderMenu;
  onUpdateOrder?: (type: "add" | "sub") => void;
}) {
  const { device } = useGetDevice();
  const { data: menus } = useGetMenus(device?.storeId ?? "");

  const normalizeMenuItem = (): {
    menuId?: string;
    quantity: number;
    name?: string;
    optionGroups: {
      id: string;
      name: string;
      options: { name: string; price: number }[];
    }[];
  } => {
    if ("orderMenuId" in orderMenu) {
      return {
        name: orderMenu.name,
        quantity: orderMenu.quantity,
        optionGroups: orderMenu.orderOptionGroups.map((group) => ({
          id: group.orderOptionGroupId,
          name: group.name,
          options: group.orderOptions,
        })),
      };
    } else {
      return {
        menuId: orderMenu.menuId,
        quantity: orderMenu.quantity,
        optionGroups: orderMenu.menuOptionGroups.map((group) => ({
          id: group.menuOptionGroupId,
          name: group.name,
          options: group.orderOptions,
        })),
      };
    }
  };

  const normalized = normalizeMenuItem();

  const isOrdered = "orderMenuId" in orderMenu;

  const Icon = normalized.quantity === 1 ? DeleteIcon : MinusIcon;

  return (
    <>
      <div
        className={cn(
          "flex items-start justify-between",
          normalized.optionGroups.length > 0 && "gap-3"
        )}
      >
        <div className="flex flex-col gap-2">
          <span className="text-xl leading-[30px] font-medium text-gray-100">
            {isOrdered
              ? normalized.name
              : menus?.categories
                  ?.flatMap((cat) => cat.menus)
                  .find((menu) => String(menu.menuId) === String(normalized.menuId))?.name}
          </span>
          <div className="flex flex-col gap-1">
            {normalized.optionGroups?.map((group) =>
              group.options?.map((option) => (
                <div key={group.id + option.name} className="flex items-center">
                  <span className="flex text-base leading-6 font-medium text-gray-400">
                    <PlusIcon width={24} height={24} className="text-gray-400" />
                    {`${group.name} : ${option.name}`}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-600"
            onClick={() => onUpdateOrder?.("sub")}
          >
            <Icon width={24} height={24} className="text-gray-300" />
          </button>
          <strong className="text-gray-0 min-w-3 text-center text-lg font-semibold">
            {normalized.quantity}
          </strong>
          <button
            type="button"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-600"
            onClick={() => onUpdateOrder?.("add")}
          >
            <PlusIcon width={24} height={24} className="text-gray-300" />
          </button>
        </div>
      </div>
      <PosPaymentsOrderBoxComp.Divider className="last:hidden" />
    </>
  );
};

PosPaymentsOrderBoxComp.Index = function Number({
  index,
  hasCheckbox = false,
  checked = false,
  onCheckboxChange,
}: {
  index: number;
  hasCheckbox?: boolean;
  checked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
}) {
  return (
    <div className="relative flex items-center gap-3">
      {hasCheckbox && <Checkbox size={24} checked={checked} onCheckedChange={onCheckboxChange} />}
      <strong className="text-gray-0 text-2xl font-semibold">{index + 1}</strong>
    </div>
  );
};

PosPaymentsOrderBoxComp.Divider = function Divider({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      <div className="h-[1px] w-full bg-gray-600" />
    </div>
  );
};

PosPaymentsOrderBoxComp.Body = function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-gray-600 p-4">{children}</div>
  );
};

export default PosPaymentsOrderBoxComp;
