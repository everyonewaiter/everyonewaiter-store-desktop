import { useNavigate } from "react-router-dom";
import Button from "@renderer/components/Button/Button";
import { useGetDevice } from "@renderer/hooks/useGetDevice";
import { useGetMenus } from "@renderer/hooks/usePosTablesDetailApi";
import { usePosTablesDetailOrderStore } from "@renderer/hooks/usePosTablesDetailOrderStore";
import OrderBox from "@renderer/pages/pos/payments/PosPaymentsOrderBoxComp";
import PosTablesDetailOrderModalComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailOrderModalComp";
import { getFormattedTableNo } from "@renderer/utils/format";
import { overlay } from "overlay-kit";

interface PosTablesDetailOrderSideCompProps {
  tableNo: number;
}

function PosTablesDetailOrderSideComp({ tableNo }: PosTablesDetailOrderSideCompProps) {
  const navigate = useNavigate();
  const { device } = useGetDevice();
  const { data: categories } = useGetMenus(device?.storeId ?? "");
  const { orders, updateMenuQuantity } = usePosTablesDetailOrderStore();

  const allMenus = categories?.categories?.flatMap((category) => category.menus) ?? [];

  const calculateTotalPrice = () => {
    return (
      orders?.reduce((acc, cur) => {
        const selectedMenu = allMenus?.find((menu) => String(menu.menuId) === String(cur.menuId));
        const selectedOptions = cur.menuOptionGroups.flatMap((group) => group.orderOptions);

        return (
          acc +
          ((selectedMenu?.price ?? 0) + selectedOptions.reduce((a, b) => a + b.price, 0)) *
            cur.quantity
        );
      }, 0) ?? 0
    );
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-gray-0 text-[28px] font-semibold">
          {getFormattedTableNo(tableNo)} 주문 내역
        </h2>
      </div>
      <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto">
        <div className="flex w-full flex-col gap-2">
          {orders && orders.length > 0 && (
            <OrderBox>
              <OrderBox.Body>
                {orders?.map((menu, index) => (
                  <OrderBox.Order
                    key={menu.menuId}
                    orderMenu={menu}
                    onUpdateOrder={(type) => updateMenuQuantity(menu.menuId, index, type)}
                  />
                ))}
              </OrderBox.Body>
            </OrderBox>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="h-0.5 w-full bg-gray-600" />
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-0 text-2xl font-semibold">주문 금액</span>
            <span className="text-gray-0 text-4xl font-bold">
              {calculateTotalPrice().toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
      <Button
        className="h-16 w-full rounded-xl text-xl font-semibold"
        onClick={() =>
          overlay.open((overlayProps) => (
            <PosTablesDetailOrderModalComp
              {...overlayProps}
              onSuccess={() => {
                navigate("/pos/tables");
                overlayProps.close();
              }}
            />
          ))
        }
      >
        주문하기
      </Button>
    </>
  );
}

export default PosTablesDetailOrderSideComp;
