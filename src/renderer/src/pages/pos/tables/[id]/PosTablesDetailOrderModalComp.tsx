import { useState } from "react";
import { Dialog } from "@renderer/components/Dialog";
import { useAddOrder } from "@renderer/pages/pos/tables/[id]/usePosTablesDetailApi";
import { usePosTablesDetailOrderStore } from "@renderer/pages/pos/tables/[id]/usePosTablesDetailOrderStore";
import { ModalProps } from "@renderer/types/overlay";

interface PosTablesDetailOrderModalCompProps extends ModalProps {}

function PosTablesDetailOrderModalComp({ ...props }: PosTablesDetailOrderModalCompProps) {
  const { orders, tableNo, resetOrders } = usePosTablesDetailOrderStore();
  const { mutate: addOrder } = useAddOrder();

  const [memo, setMemo] = useState("");

  const handleAddOrder = () => {
    if (!orders) return;

    addOrder(
      {
        tableNo: tableNo,
        memo: "",
        orders: orders ?? [],
      },
      {
        onSuccess: () => {
          props.close();
          resetOrders();
        },
      }
    );
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper>
        <div className="flex flex-col gap-5">
          <h2 className="text-gray-0 text-center text-xl font-semibold">주문하시겠습니까?</h2>
          <textarea
            className="placholder:text-gray-100 text-gray-0 h-30 w-full resize-none rounded-xl border border-gray-600 px-4 pt-3 pb-4 text-base font-medium outline-none"
            placeholder="주문 관련 메모 작성"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
        <Dialog.Footer
          buttonSize="xl"
          primaryButton={{ text: "주문하기", onClick: handleAddOrder }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosTablesDetailOrderModalComp;
