import { useNavigate, useSearchParams } from "react-router-dom";
import { ReturnIcon } from "@renderer/assets/icons";
import { Button } from "@renderer/components";
import PosHeaderComp from "@renderer/pages/pos/PosHeaderComp";
import PosTablesBoxComp from "@renderer/pages/pos/tables/PosTablesBoxComp";
import PosTablesChangeTableModalComp from "@renderer/pages/pos/tables/PosTablesChangeTableModalComp";
import { useGetPosTables } from "@renderer/queries/useGetPosTables";
import { overlay } from "overlay-kit";

function PosTablesPage() {
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const currentTableNo = searchParams[0].get("currentTableNo");

  const { tables } = useGetPosTables();

  const handleTableBoxClick = (tableNo: number) => {
    if (currentTableNo) {
      overlay.open((overlayProps) => (
        <PosTablesChangeTableModalComp
          {...overlayProps}
          fromTableNo={Number(currentTableNo)}
          toTableNo={tableNo}
          onSuccess={() => navigate(`/pos/tables/${tableNo}`)}
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
            돌아가기
          </Button>
        )}
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {tables?.map((table) => (
            <PosTablesBoxComp
              key={table.posTableId}
              {...table}
              className={
                currentTableNo && table.tableNo !== Number(currentTableNo) ? "animate-wiggle" : ""
              }
              disabled={currentTableNo ? table.tableNo === Number(currentTableNo) : false}
              onClick={() => handleTableBoxClick(table.tableNo)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PosTablesPage;
