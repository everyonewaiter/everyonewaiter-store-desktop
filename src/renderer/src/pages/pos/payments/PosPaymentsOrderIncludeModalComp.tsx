import { Dialog } from "@renderer/components/Dialog";
import { ColorName } from "@renderer/constants";
import { closePrinter, openUsbPrinter, printReceiptWithActivity } from "@renderer/modules/printer";
import { Store, TableActivity } from "@renderer/types/domain";
import { ModalProps } from "@renderer/types/overlay";

interface PosPaymentsOrderIncludeModalCompProps extends ModalProps {
  store: Store;
  activity: TableActivity;
}

function PosPaymentsOrderIncludeModalComp({
  store,
  activity,
  ...props
}: PosPaymentsOrderIncludeModalCompProps) {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper gap={32}>
        <div className="flex flex-col items-center justify-center gap-3 py-6">
          <span className="text-gray-0 text-xl font-semibold">영수증 출력</span>
          <span className="text-lg font-normal text-gray-200">주문내역을 포함할까요?</span>
        </div>
        <Dialog.Footer
          buttonSize="xl"
          secondaryButton={{
            color: ColorName.BLACK,
            text: "미포함",
            onClick: () => {
              openUsbPrinter()
                .then((result) => {
                  if (result === 0) {
                    printReceiptWithActivity(store, activity, false);
                    closePrinter();
                  }
                })
                .finally(() => props.close());
            },
          }}
          primaryButton={{
            color: ColorName.PRIMARY,
            text: "포함",
            onClick: () => {
              openUsbPrinter()
                .then((result) => {
                  if (result === 0) {
                    printReceiptWithActivity(store, activity, true);
                    closePrinter();
                  }
                })
                .finally(() => props.close());
            },
          }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosPaymentsOrderIncludeModalComp;
