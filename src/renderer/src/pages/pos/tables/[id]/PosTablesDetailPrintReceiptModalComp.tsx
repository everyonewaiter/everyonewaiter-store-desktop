import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@renderer/api";
import { Dialog } from "@renderer/components/Dialog";
import { useGetStore } from "@renderer/hooks/useGetStore";
import { printReceiptWithActivity } from "@renderer/modules/printer";
import { TableActivity } from "@renderer/types/domain";
import { ModalProps } from "@renderer/types/overlay";

interface PosTablesDetailPrintReceiptModalCompProps extends ModalProps {
  posTableActivityId: string;
}

function PosTablesDetailPrintReceiptModalComp({
  posTableActivityId,
  ...props
}: PosTablesDetailPrintReceiptModalCompProps) {
  const navigate = useNavigate();

  const [activity, setActivity] = useState<TableActivity | null>(null);
  const { store } = useGetStore(activity?.storeId ?? "");

  useEffect(() => {
    const fetchActivity = async () => {
      const { data } = await api.get(`/pos/tables/activities/${posTableActivityId}`);
      setActivity(data);
    };

    fetchActivity();
  }, [posTableActivityId]);

  const handlePrintReceipt = () => {
    if (store && activity) {
      printReceiptWithActivity(store, activity, true);
      navigate("/pos/tables");
      props.close();
    }
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper>
        <div className="text-gray-0 flex items-center justify-center py-6 text-xl font-semibold">
          영수증을 출력하시겠습니까?
        </div>
        <Dialog.Footer
          buttonSize="xl"
          primaryButton={{
            text: "출력하기",
            onClick: handlePrintReceipt,
            disabled: !activity || !store,
          }}
          secondaryButton={{
            onClick: () => {
              navigate("/pos/tables");
            },
          }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosTablesDetailPrintReceiptModalComp;
