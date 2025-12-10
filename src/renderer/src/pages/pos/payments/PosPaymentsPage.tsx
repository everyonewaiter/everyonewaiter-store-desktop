import { useEffect, useState } from "react";
import { api } from "@renderer/api";
import { Button, DatePicker, Table } from "@renderer/components";
import PosPaymentsSideComp from "@renderer/pages/pos/payments/PosPaymentsSideComp";
import PosHeaderComp from "@renderer/pages/pos/PosHeaderComp";
import { useGetDevice } from "@renderer/queries/useGetDevice";
import { useGetStore } from "@renderer/queries/useGetStore";
import { OrderPayment } from "@renderer/types/domain";
import dayjs from "dayjs";

const COLUMN_WIDTHS = {
  number: "flex-[1]",
  cash: "flex-[1.8]",
  card: "flex-[1.8]",
  total: "flex-[1.8]",
  status: "flex-[1.4]",
  createdAt: "flex-[1.8]",
};

function PosPaymentsPage() {
  const { device } = useGetDevice();
  const { store } = useGetStore(device?.storeId ?? "");

  const [payments, setPayments] = useState<OrderPayment[]>([]);
  const [selectedPayment] = useState<OrderPayment | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchPayments = () => {
      api
        .get(`/orders/payments?date=${dayjs(selectedDate).format("YYYYMMDD")}`)
        .then(({ data }) => setPayments(data?.payments ?? []));
    };

    fetchPayments();
  }, [selectedDate]);

  if (!store) {
    return null;
  }

  return (
    <div className="flex min-h-dvh flex-col overflow-y-hidden">
      <PosHeaderComp />
      <div className="relative flex w-full flex-1">
        <div className="flex h-[calc(100dvh-133px)] flex-[calc(1-0.3375)] flex-col gap-6 overflow-y-auto px-15 py-8">
          <DatePicker date={selectedDate} onSetDate={setSelectedDate} />
          <Table className="">
            <Table.Header className="flex w-full">
              <Table.Row className="flex w-full cursor-default">
                <Table.Head className={COLUMN_WIDTHS.number}>번호</Table.Head>
                <Table.Head className={COLUMN_WIDTHS.cash}>현금</Table.Head>
                <Table.Head className={COLUMN_WIDTHS.card}>카드</Table.Head>
                <Table.Head className={COLUMN_WIDTHS.total}>합계</Table.Head>
                <Table.Head className={COLUMN_WIDTHS.status}>상태</Table.Head>
                <Table.Head className={COLUMN_WIDTHS.createdAt}>시간</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {payments.map((payment, index, arr) => (
                // TODO: 행 선택 시 setSelectedPayment 호출
                <Table.Row className="flex w-full" key={payment.orderPaymentId}>
                  <Table.Cell className={COLUMN_WIDTHS.number}>{arr.length - index}</Table.Cell>
                  <Table.Cell className={COLUMN_WIDTHS.cash}>
                    {payment.method === "CASH" ? `${payment.amount.toLocaleString()}원` : "-"}
                  </Table.Cell>
                  <Table.Cell className={COLUMN_WIDTHS.card}>
                    {payment.method === "CARD" ? `${payment.amount.toLocaleString()}원` : "-"}
                  </Table.Cell>
                  <Table.Cell className={COLUMN_WIDTHS.total}>
                    {payment.amount.toLocaleString()}원
                  </Table.Cell>
                  <Table.Cell className={COLUMN_WIDTHS.status}>
                    <Button
                      color={payment.state === "APPROVE" ? "approve" : "reject"}
                      className="button-sm"
                    >
                      {payment.state === "APPROVE" ? "승인" : "취소"}
                    </Button>
                  </Table.Cell>
                  <Table.Cell className={COLUMN_WIDTHS.createdAt}>
                    {payment.createdAt.split(":")[0]}시 {payment.createdAt.split(":")[1]}분{" "}
                    {payment.createdAt.split(":")[2]}초
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        {selectedPayment && <PosPaymentsSideComp store={store} payment={selectedPayment} />}
      </div>
    </div>
  );
}

export default PosPaymentsPage;
