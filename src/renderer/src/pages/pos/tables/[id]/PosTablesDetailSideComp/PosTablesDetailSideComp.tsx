import { useState } from "react";
import PosTablesDetailCancelPaymentModalComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailCancelPaymentModalComp";
import PosTablesDetailCheckoutSideComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailSideComp/PosTablesDetailCheckoutSideComp";
import PosTablesDetailOrderSideComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailSideComp/PosTablesDetailOrderSideComp";
import { useGetTableActivity } from "@renderer/pages/pos/tables/[id]/usePosTablesDetailApi";
import { Order } from "@renderer/types/domain";
import { overlay } from "overlay-kit";

interface PosTablesDetailSideCompProps {
  type?: "order" | "checkout";
  tableNo: number;
}

function PosTablesDetailSideComp({ type = "checkout", tableNo }: PosTablesDetailSideCompProps) {
  const [checkedOrders, setCheckedOrders] = useState<Order[]>([]);

  const { data: activity } = useGetTableActivity(tableNo);

  const handleCancelPayment = () => {
    const cancelOrderPrice =
      type === "checkout" && activity?.orderType === "POSTPAID" && checkedOrders.length > 0
        ? checkedOrders.reduce((acc, order) => acc + order.price, 0)
        : (activity?.totalOrderPrice ?? 0);

    overlay.open((overlayProps) => (
      <PosTablesDetailCancelPaymentModalComp
        tableNo={tableNo}
        cancelOrderPrice={cancelOrderPrice}
        checkedOrders={checkedOrders}
        activity={activity!}
        {...overlayProps}
      />
    ));
  };

  return (
    <aside
      className="sticky top-0 right-0 flex h-dvh flex-[0.3375] flex-col gap-8 overflow-y-hidden rounded-tl-[40px] rounded-bl-[40px] pt-10 pr-4 pb-8 pl-8"
      style={{ boxShadow: "-2px 0px 20px 0px rgba(0, 0, 0, 0.08)" }}
    >
      {type === "order" && <PosTablesDetailOrderSideComp tableNo={tableNo} />}
      {type === "checkout" && (
        <PosTablesDetailCheckoutSideComp
          tableNo={tableNo}
          checkedOrders={checkedOrders}
          setCheckedOrders={setCheckedOrders}
          onCancelPayment={handleCancelPayment}
        />
      )}
    </aside>
  );
}

export default PosTablesDetailSideComp;
