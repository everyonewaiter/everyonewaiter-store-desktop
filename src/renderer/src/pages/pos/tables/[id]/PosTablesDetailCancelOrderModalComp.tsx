import { Dialog } from "@renderer/components/Dialog";
import { useCancelOrder } from "@renderer/hooks/usePosTablesDetailApi";
import { Order, TableActivity } from "@renderer/types/domain";
import { ModalProps } from "@renderer/types/overlay";
import { getFormattedTableNo } from "@renderer/utils/format";
import { handleApiError } from "@renderer/utils/handle-api-error";

interface PosTablesDetailCancelOrderModalCompProps extends ModalProps {
  tableNo: number;
  activity: TableActivity;
  checkedOrders: Order[];
  onDeleteAllOrders: () => void;
}

function PosTablesDetailCancelOrderModalComp({
  tableNo,
  activity,
  checkedOrders,
  onDeleteAllOrders,
  ...props
}: PosTablesDetailCancelOrderModalCompProps) {
  const { mutateAsync: cancelOrder, isPending } = useCancelOrder();

  const isSelected = checkedOrders.length > 0;
  const orders = isSelected ? checkedOrders : activity.orders;
  const menus = orders.map((order) => order.orderMenus).flat();

  const handleCancel = async () => {
    try {
      await Promise.all(orders.map((order) => cancelOrder({ tableNo, orderId: order.orderId })));
      if (!isSelected || checkedOrders.length === activity.orders.length) {
        onDeleteAllOrders();
      }
      props.close();
    } catch (error) {
      handleApiError(error as Error);
    }
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper>
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between rounded-xl border border-gray-600 p-6 py-4">
            <span className="text-gray-0 text-2xl font-semibold">
              {getFormattedTableNo(tableNo)}
            </span>
            <span className="text-primary text-3xl font-bold">
              {orders.reduce((acc, order) => acc + order.price, 0).toLocaleString()}
            </span>
          </div>
          {isSelected ? (
            <span className="text-gray-0 text-center text-xl font-normal">
              <span className="font-semibold">
                {menus.length > 1 ? `${menus[0].name} 외 ${menus.length - 1}개` : menus[0].name}
              </span>
              의 주문을 취소하시겠습니까?
            </span>
          ) : (
            <span className="text-gray-0 text-center text-xl font-normal">
              전체 주문을 취소하시겠습니까?
            </span>
          )}
        </div>
        <Dialog.Footer
          buttonSize="xl"
          primaryButton={{
            text: isPending ? "취소중..." : "취소하기",
            onClick: handleCancel,
            disabled: isPending,
          }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosTablesDetailCancelOrderModalComp;
