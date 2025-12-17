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
  const handlePayment = async () => {
    // TODO: 결제 로직에 필요한 데이터 가져올 수 있도록 변경
    // TODO: 이 함수 구현은 아래 데이터를 console.log로 찍어주세요.
    // 결제할 금액 (사용자 입력)
    // 선택한 현금 영수증 타입
    // 입력한 현금 영수증 휴대폰 번호 또는 사업자 번호
    // 카드 할부 개월
  };

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
                {
                  // TODO: orderMenus.length가 1인경우와 2이상인 경우 분기처리
                  // 1인 경우 알리오 올리오
                  // 2이상인 경우 알리오 올리오 외 n개
                }
                {activity.orders[0].orderMenus[0].name} 외{" "}
                {activity.orders
                  .map((order) => order.orderMenus.length)
                  .reduce((a, b) => a + b, 0) - 1}
                개
              </h3>
            </div>
            {
              // TODO: 결제 금액을 수정할 수 있도록 입력창으로 변경
              // 기본값 activity.remainingPaymentPrice
              // 최대값 activity.remainingPaymentPrice
            }
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
                  {
                    // TODO: 선택된 receiptType에 따라 텍스트 변경
                    // 신청안함 아래 span 및 input 숨기기
                    // 개인소득공제 span 텍스트 휴대폰 번호, input placeholder 휴대폰 번호
                    // 사업자증빙용 span 텍스트 사업자번호, input placeholder 사업자번호
                  }
                  <span className="text-gray-0 text-[15px] font-normal">휴대폰 번호</span>
                  <Input placeholder="휴대폰 번호 / 사업자번호" className="w-full" />
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                {
                  // TODO: default값은 일시불로 설정
                }
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
            onClick: handlePayment,
          }}
          secondaryButton={{ hide: true }}
        />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosTablesDetailPaymentModalComp;
