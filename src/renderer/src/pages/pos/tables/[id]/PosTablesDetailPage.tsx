import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePosTablesDetailOrderStore } from "@renderer/hooks/usePosTablesDetailOrderStore";
import PosTablesDetailContentComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailContentComp";
import PosTablesDetailSideComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailSideComp/PosTablesDetailSideComp";

function PosTablesDetailPage() {
  const params = useParams();
  const tableNo = Number(params.id);
  const { orders, setTableNo } = usePosTablesDetailOrderStore();

  useEffect(() => {
    setTableNo(tableNo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableNo]);

  return (
    <div className="flex h-dvh flex-col">
      <div className="relative flex w-full flex-1 overflow-hidden">
        <PosTablesDetailContentComp />
        <PosTablesDetailSideComp
          type={orders && orders.length > 0 ? "order" : "checkout"}
          tableNo={tableNo}
        />
      </div>
    </div>
  );
}

export default PosTablesDetailPage;
