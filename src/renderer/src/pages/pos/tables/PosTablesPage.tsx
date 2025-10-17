import { MOCK } from "@renderer/pages/pos/mock";
import PosHeaderComp from "@renderer/pages/pos/PosHeaderComp";
import PosTablesBoxComp from "@renderer/pages/pos/tables/PosTablesBoxComp";

function PosTablesPage() {
  return (
    <div className="flex flex-col">
      <PosHeaderComp />
      <div className="flex flex-col gap-6 px-15 py-8">
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {MOCK.map((table) => (
            <PosTablesBoxComp key={table.posTableId} {...table} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PosTablesPage;
