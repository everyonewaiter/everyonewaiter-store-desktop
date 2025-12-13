import { MENU_LIST_MOCK, TABLE_ACTIVITY_MOCK } from "@renderer/pages/pos/mock";
import PosTablesDetailContentComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailContentComp";
import PosTablesDetailSideComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailSideComp";
import { usePosTablesDetailOrderStore } from "@renderer/pages/pos/tables/[id]/usePosTablesDetailOrderStore";

function PosTablesDetailPage() {
  const { orders } = usePosTablesDetailOrderStore();

  return (
    <div className="flex h-dvh flex-col">
      <div className="relative flex w-full flex-1 overflow-hidden">
        <PosTablesDetailContentComp />
        <PosTablesDetailSideComp
          type={orders ? "order" : "checkout"}
          activity={TABLE_ACTIVITY_MOCK}
          menus={MENU_LIST_MOCK.menus}
        />
      </div>
    </div>
  );
}

export default PosTablesDetailPage;
