import { MENU_LIST_MOCK, TABLE_ACTIVITY_MOCK } from "../../mock";
import PosTablesDetailContentComp from "./PosTablesDetailContentComp";
import PosTablesDetailSideComp from "./PosTablesDetailSideComp";

function PosTablesDetailPage() {
  return (
    <div className="flex h-dvh flex-col">
      <div className="relative flex w-full flex-1 overflow-hidden">
        <PosTablesDetailContentComp />
        <PosTablesDetailSideComp
          type="checkout"
          activity={TABLE_ACTIVITY_MOCK}
          menus={MENU_LIST_MOCK.menus}
        />
      </div>
    </div>
  );
}

export default PosTablesDetailPage;
