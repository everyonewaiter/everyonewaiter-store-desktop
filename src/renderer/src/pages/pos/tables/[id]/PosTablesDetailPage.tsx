import { MENU_LIST_MOCK, TABLE_ACTIVITY_MOCK } from "@renderer/pages/pos/mock";
import PosTablesDetailContentComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailContentComp";
import PosTablesDetailSideComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailSideComp";

function PosTablesDetailPage() {
  return (
    <div className="flex h-dvh flex-col">
      <div className="relative flex w-full flex-1 overflow-hidden">
        <PosTablesDetailContentComp />
        <PosTablesDetailSideComp
          type="checkout"
          activity={TABLE_ACTIVITY_MOCK}
          menus={MENU_LIST_MOCK.menus ?? []}
        />
      </div>
    </div>
  );
}

export default PosTablesDetailPage;
