import { Button, Dropdown, Input } from "@renderer/components";
import { Dialog } from "@renderer/components/Dialog";
import { TableActivity } from "@renderer/types/domain";
import { ModalProps } from "@renderer/types/overlay";
import { getFormattedTableNo } from "@renderer/utils/format";

const cardInstallmentMonths = new Array(12)
  .fill(0)
  .map((_, i) =>
    i === 0 ? { name: "일시불", id: "0" } : { name: `${i + 1}개월`, id: String(i + 1) }
  );

const cashReceiptTypes = [
  {
    label: "신청안함",
    value: "none",
  },
  {
    label: "개인소득공제용",
    value: "individual",
  },
  {
    label: "사업자증빙용",
    value: "business",
  },
];

interface PosTablesDetailPaymentModalCompProps extends ModalProps {
  paymentType: "cash" | "card";
  activity: TableActivity;
}

function PosTablesDetailPaymentModalComp({
  paymentType,
  activity,
  ...props
}: PosTablesDetailPaymentModalCompProps) {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper width={648}>
        <div className="flex flex-col gap-10">
          <h2 className="text-gray-0 text-2xl font-semibold">
            {getFormattedTableNo(activity.tableNo)}
          </h2>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-gray-0 text-[15px] font-normal">결제 정보</span>
              <h3 className="text-gray-0 text-2xl font-semibold">
                {activity.orders[0].orderMenus[0].name} 외{" "}
                {activity.orders
                  .map((order) => order.orderMenus.length)
                  .reduce((a, b) => a + b, 0) - 1}
                개
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-0 text-[15px] font-normal">결제할 금액</span>
              <h3 className="text-gray-0 text-2xl font-semibold">
                {activity.totalOrderPrice.toLocaleString()}원
              </h3>
            </div>
            {paymentType === "cash" ? (
              <>
                <div className="flex flex-col gap-2">
                  <span className="text-gray-0 text-[15px] font-normal">현금영수증 발행</span>
                  <div className="flex items-center gap-3">
                    {cashReceiptTypes.map((receiptType) => (
                      <Button
                        key={receiptType.value}
                        variant="outline"
                        color="grey"
                        className="button-lg focus:border-primary focus:text-primary flex-1 border border-gray-500 text-base !font-medium text-gray-200"
                      >
                        {receiptType.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-gray-0 text-[15px] font-normal">휴대폰 번호</span>
                  <Input placeholder="휴대폰 번호 / 사업자번호" className="w-full" />
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <span className="text-gray-0 text-[15px] font-normal">할부 개월</span>
                <Dropdown
                  dropdownItems={cardInstallmentMonths}
                  defaultText="할부개월을 선택해주세요."
                />
              </div>
            )}
          </div>
        </div>
        <Dialog.Footer
          buttonSize="custom"
          primaryButton={{
            text: paymentType === "cash" ? "현금 결제하기" : "카드 결제하기",
            className: "h-16 rounded-xl bg-gray-0 text-xl !font-semibold",
          }}
          secondaryButton={{ hide: true }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosTablesDetailPaymentModalComp;
