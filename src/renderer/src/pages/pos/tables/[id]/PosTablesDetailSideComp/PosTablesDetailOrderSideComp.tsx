import { useNavigate } from "react-router-dom";
import { Button } from "@renderer/components";
import OrderBox from "@renderer/pages/pos/payments/PosPaymentsOrderBoxComp";
import PosTablesDetailOrderModalComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailOrderModalComp";
import { usePosTablesDetailOrderStore } from "@renderer/pages/pos/tables/[id]/usePosTablesDetailOrderStore";
import { getFormattedTableNo } from "@renderer/utils/format";
import { overlay } from "overlay-kit";

interface PosTablesDetailOrderSideCompProps {
  tableNo: number;
}

function PosTablesDetailOrderSideComp({ tableNo }: PosTablesDetailOrderSideCompProps) {
  const navigate = useNavigate();
  const { orders, updateMenuQuantity } = usePosTablesDetailOrderStore();

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-gray-0 text-[28px] font-semibold">
          {getFormattedTableNo(tableNo)}번 주문 내역
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
              {orders
                ?.reduce((acc, cur) => acc + cur.totalPrice * cur.quantity, 0)
                ?.toLocaleString()}
              원
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
