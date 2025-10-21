import { MENU_LIST_MOCK, TABLE_ACTIVITY_MOCK } from "../../mock";
import PosTablesContentComp from "./PosTablesContentComp";
import PosTablesSideComp from "./PosTablesSideComp";

function PosTablesDetailPage() {
  return (
    <div className="flex h-dvh flex-col">
      <div className="relative flex w-full flex-1 overflow-hidden">
        <PosTablesContentComp />
        <PosTablesSideComp
          type="checkout"
          activity={TABLE_ACTIVITY_MOCK}
          menus={MENU_LIST_MOCK.menus}
        />
      </div>
    </div>
  );
}

export default PosTablesDetailPage;
