import { Fragment } from "react/jsx-runtime";
import { PlusIcon } from "@renderer/assets/icons";
import { Checkbox } from "@renderer/components";
import { OrderMenu } from "@renderer/types/domain";

function PosPaymentsOrderBoxComp({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

PosPaymentsOrderBoxComp.Order = function Order({ order }: { order: OrderMenu }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-gray-600 p-4">
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium text-gray-100">{order.name}</span>
        <span className="text-lg font-medium text-gray-100">{order.quantity}개</span>
      </div>
      <div className="flex flex-col gap-1">
        {order.orderOptionGroups.map((group) =>
          group.orderOptions.map((option) => (
            <div key={group.orderOptionGroupId} className="flex items-center justify-between">
              <Fragment>
                <span className="flex text-base font-medium text-[#2E7BB3]">
                  <PlusIcon width={24} height={24} color="#2E7BB3" />
                  {group.name}
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
      {hasCheckbox && <Checkbox />}
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
