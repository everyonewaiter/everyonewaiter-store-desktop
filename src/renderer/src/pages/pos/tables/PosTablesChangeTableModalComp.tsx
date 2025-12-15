import { DoubleArrowIcon } from "@renderer/assets/icons";
import { Dialog } from "@renderer/components/Dialog";
import { useChangeTable } from "@renderer/pages/pos/tables/[id]/usePosTablesDetailApi";
import { ModalProps } from "@renderer/types/overlay";
import { getFormattedTableNo } from "@renderer/utils/format";
import { handleApiError } from "@renderer/utils/handle-api-error";

interface PosTablesChangeTableModalCompProps extends ModalProps {
  fromTableNo: number;
  toTableNo: number;
  onSuccess: () => void;
}

function PosTablesChangeTableModalComp({
  fromTableNo,
  toTableNo,
  onSuccess,
  ...props
}: PosTablesChangeTableModalCompProps) {
  const { mutate: changeTable } = useChangeTable();

  const handleMoveTable = () => {
    changeTable(
      { sourceTableNo: fromTableNo, targetTableNo: toTableNo },
      {
        onSuccess: () => {
          props.close();
          onSuccess();
        },
        onError: (error) => handleApiError(error),
      }
    );
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper gap={32}>
        <div className="flex items-center gap-3">
          <div className="text-gray-0 h-20 flex-1 rounded-2xl border border-gray-600 p-6 text-center text-xl font-semibold">
            {getFormattedTableNo(fromTableNo)}
          </div>
          <DoubleArrowIcon className="size-6" />
          <div className="text-gray-0 border-primary h-20 flex-1 rounded-2xl border p-6 text-center text-xl font-semibold">
            {getFormattedTableNo(toTableNo)}
          </div>
        </div>
        <div className="flex flex-col gap-3 text-center">
          <span className="text-lg font-normal text-gray-100">
            <span className="text-0 text-xl font-medium">{getFormattedTableNo(fromTableNo)}</span>
            에서{" "}
            <span className="text-primary text-xl font-medium">
              {getFormattedTableNo(toTableNo)}
            </span>
            로 이동합니다.
          </span>
          <span className="text-0 text-xl font-semibold">좌석 이동하시겠습니까?</span>
        </div>
        <Dialog.Footer
          buttonSize="xl"
          primaryButton={{ text: "이동하기", onClick: handleMoveTable }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosTablesChangeTableModalComp;
