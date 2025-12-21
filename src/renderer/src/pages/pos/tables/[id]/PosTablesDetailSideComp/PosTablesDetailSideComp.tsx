import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PosTablesDetailCancelOrderModalComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailCancelOrderModalComp";
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
  const navigate = useNavigate();
  const [checkedOrders, setCheckedOrders] = useState<Order[]>([]);

  const { data: activity } = useGetTableActivity(tableNo);

  const handleCancelOrder = () => {
    if (!activity) return;
    overlay.open((overlayProps) => (
      <PosTablesDetailCancelOrderModalComp
        tableNo={tableNo}
        checkedOrders={checkedOrders}
        activity={activity}
        onDeleteAllOrders={() => navigate(`/pos/tables`)}
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
          onCancelOrder={handleCancelOrder}
        />
      )}
    </aside>
  );
}

export default PosTablesDetailSideComp;
