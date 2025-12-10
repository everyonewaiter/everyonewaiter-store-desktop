import { useEffect, useState } from "react";
import { api } from "@renderer/api";
import { DatePicker } from "@renderer/components";
import { Dialog } from "@renderer/components/Dialog";
import { Revenue } from "@renderer/types/domain";
import { ModalProps } from "@renderer/types/overlay";
import dayjs from "dayjs";

interface PosPaymentsSalesModalCompProps extends ModalProps {}

function PosPaymentsSalesModalComp({ ...props }: PosPaymentsSalesModalCompProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [revenue, setRevenue] = useState<Revenue | null>(null);

  useEffect(() => {
    const fetchRevenue = () => {
      api
        .get(`/pos/revenue?date=${dayjs(selectedDate).format("YYYYMMDD")}`)
        .then(({ data }) => setRevenue(data));
    };

    fetchRevenue();
  }, [selectedDate]);

  return (
    <Dialog open={props.isOpen} onOpenChange={props.close}>
      <Dialog.Wrapper>
        <DatePicker date={selectedDate} onSetDate={setSelectedDate} />
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-0 text-2xl font-semibold">
              {dayjs(selectedDate).format("MM월 DD일")} 매출 내역
            </h1>
            <h1 className="text-primary text-2xl font-semibold">
              {revenue?.totalPaymentPrice.toLocaleString() ?? 0}원
            </h1>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-[10px]">
              <h2 className="text-gray-0 text-xl font-semibold">주문 금액</h2>
              <div className="flex flex-col gap-3 rounded-2xl border border-gray-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-0 text-lg font-semibold">주문 금액</h3>
                  <h3 className="text-gray-0 text-lg font-semibold">
                    {revenue?.totalOrderPrice.toLocaleString() ?? 0}원
                  </h3>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-0 text-lg font-semibold">할인</h3>
                  <h3 className="text-gray-0 text-lg font-semibold">
                    {revenue?.totalDiscountPrice.toLocaleString() ?? 0}원
                  </h3>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <h2 className="text-gray-0 text-xl font-semibold">결제 금액</h2>
              <div className="flex flex-col gap-3 rounded-2xl border border-gray-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-0 text-lg font-semibold">카드</h3>
                  <h3 className="text-gray-0 text-lg font-semibold">
                    {revenue?.cardPaymentApprovePrice.toLocaleString() ?? 0}원
                  </h3>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-0 text-lg font-semibold">현금</h3>
                  <h3 className="text-gray-0 text-lg font-semibold">
                    {revenue?.cashPaymentApprovePrice.toLocaleString() ?? 0}원
                  </h3>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <h2 className="text-gray-0 text-xl font-semibold">취소 금액</h2>
              <div className="flex flex-col gap-3 rounded-2xl border border-gray-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-0 text-lg font-semibold">카드</h3>
                  <h3 className="text-gray-0 text-lg font-semibold">
                    {revenue?.cardPaymentCancelPrice.toLocaleString() ?? 0}원
                  </h3>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-0 text-lg font-semibold">현금</h3>
                  <h3 className="text-gray-0 text-lg font-semibold">
                    {revenue?.cashPaymentCancelPrice.toLocaleString() ?? 0}원
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dialog.Footer primaryButton={{ hide: true }} secondaryButton={{ text: "닫기" }} />
      </Dialog.Wrapper>
    </Dialog>
  );
}

export default PosPaymentsSalesModalComp;
