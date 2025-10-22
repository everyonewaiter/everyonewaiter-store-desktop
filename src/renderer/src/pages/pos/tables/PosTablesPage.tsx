import { useNavigate, useSearchParams } from "react-router-dom";
import { ReturnIcon } from "@renderer/assets/icons";
import { Button } from "@renderer/components";
import { MOCK } from "@renderer/pages/pos/mock";
import PosHeaderComp from "@renderer/pages/pos/PosHeaderComp";
import PosTablesBoxComp from "@renderer/pages/pos/tables/PosTablesBoxComp";
import PosTablesChangeTableModalComp from "@renderer/pages/pos/tables/PosTablesChangeTableModalComp";
import { overlay } from "overlay-kit";

function PosTablesPage() {
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const currentTableNo = searchParams[0].get("currentTableNo");

  const handleMoveToTableDetail = (tableNo: number) => {
    if (currentTableNo) {
      overlay.open((overlayProps) => (
        <PosTablesChangeTableModalComp
          {...overlayProps}
          fromTableNo={Number(currentTableNo)}
          toTableNo={tableNo}
        />
      ));
    } else {
      navigate(`/pos/tables/${tableNo}`);
    }
  };

  return (
    <div className="flex flex-col">
      <PosHeaderComp />
      <div className="flex flex-col gap-6 px-15 py-8">
        {currentTableNo && (
          <Button
            variant="outline"
            color="grey"
            className="text-gray-0 flex w-fit items-center gap-2 rounded-3xl border-gray-300 px-5 py-[15px] text-xl font-normal"
            onClick={() => navigate(`/pos/tables/${currentTableNo}`)}
          >
            <ReturnIcon className="h-7 w-7" />
            테이블 목록으로 이동
          </Button>
        )}
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {MOCK.map((table) => (
            <PosTablesBoxComp
              key={table.posTableId}
              {...table}
              className={
                currentTableNo
                  ? table.tableNo === Number(currentTableNo)
                    ? "cursor-default border-none bg-gray-500/60"
                    : "animate-wiggle"
                  : ""
              }
              onClick={() =>
                table.tableNo === Number(currentTableNo)
                  ? null
                  : handleMoveToTableDetail(table.tableNo)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PosTablesPage;
