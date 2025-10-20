import { NoteIcon, ReturnIcon, RotateIcon, SaveIcon, SendIcon } from "@renderer/assets/icons";
import { Button } from "@renderer/components";
import PosPaymentsOrderBoxComp from "@renderer/pages/pos/payments/PosPaymentsOrderBoxComp";
import PosHeaderComp from "@renderer/pages/pos/PosHeaderComp";
import PosTablesDetailMenuCardComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailMenuCardComp";
import { CATEGORY_MOCK, POS_DETAIL_ORDER_MOCK } from "../../mock";

const floatingAction = [
  {
    label: "좌석 이동",
    icon: <RotateIcon width={28} height={28} color="#292D32" />,
    onClick: () => {},
  },
  {
    label: "메모",
    icon: <NoteIcon width={28} height={28} color="#292D32" />,
    onClick: () => {},
  },
  {
    label: "주방 재전송",
    icon: <SendIcon width={28} height={28} color="#292D32" />,
    onClick: () => {},
  },
  {
    label: "테이블 목록으로 이동",
    icon: <ReturnIcon width={28} height={28} color="#292D32" />,
    onClick: () => {},
  },
  {
    label: "저장하기",
    icon: <SaveIcon width={28} height={28} color="#292D32" />,
    onClick: () => {},
  },
];

function PosTablesDetailPage() {
  return (
    <div className="flex h-dvh flex-col">
      <div className="relative flex w-full flex-1 overflow-hidden">
        <div className="scrollbar-hide relative flex flex-[calc(1-0.3375)] flex-col overflow-y-auto">
          <PosHeaderComp />
          <div className="flex items-center gap-3 px-15 pt-10 pb-3">
            <Button
              variant="outline"
              color="black"
              className="focus:bg-primary focus:border-primary border-gray-[#4F4F4F] h-10 rounded-lg border px-5 text-[#4F4F4F] hover:bg-transparent hover:text-[#4F4F4F] focus:text-white"
            >
              전체
            </Button>
            {CATEGORY_MOCK.map((category) => (
              <Button
                variant="outline"
                color="black"
                className="focus:bg-primary focus:border-primary border-gray-[#4F4F4F] h-10 rounded-lg border px-5 text-[#4F4F4F] hover:bg-transparent hover:text-[#4F4F4F] focus:text-white"
                key={category.categoryId}
              >
                {category.category}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-x-6 gap-y-10 px-15 py-6">
            <PosTablesDetailMenuCardComp name="스노우치즈폭립" price={29000} />
            <PosTablesDetailMenuCardComp name="스노우치즈폭립" price={29000} />
            <PosTablesDetailMenuCardComp name="스노우치즈폭립" price={29000} />
            <PosTablesDetailMenuCardComp name="스노우치즈폭립" price={29000} />
            <PosTablesDetailMenuCardComp name="스노우치즈폭립" price={29000} />
            <PosTablesDetailMenuCardComp name="스노우치즈폭립" price={29000} />
            <PosTablesDetailMenuCardComp name="스노우치즈폭립" price={29000} />
            <PosTablesDetailMenuCardComp name="스노우치즈폭립" price={29000} />
            <PosTablesDetailMenuCardComp name="스노우치즈폭립" price={29000} />
            <PosTablesDetailMenuCardComp name="스노우치즈폭립" price={29000} />
            <PosTablesDetailMenuCardComp name="스노우치즈폭립" price={29000} />
            <PosTablesDetailMenuCardComp name="스노우치즈폭립" price={29000} />
          </div>
          <nav
            className="absolute bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-6 rounded-[40px] bg-white px-10 py-6"
            style={{ boxShadow: "0px 0px 24px 0px rgba(0, 0, 0, 0.08)" }}
          >
            {floatingAction.map((action, index) => (
              <>
                <div className="text-gray-0 flex flex-row items-center gap-2 text-xl font-normal">
                  {action.icon}
                  {action.label}
                </div>
                {index !== floatingAction.length - 1 && <div className="h-5 w-[1px] bg-gray-600" />}
              </>
            ))}
          </nav>
        </div>
        <aside
          className="sticky top-0 right-0 flex h-dvh flex-[0.3375] flex-col gap-8 overflow-y-hidden rounded-tl-[40px] rounded-bl-[40px] pt-10 pr-4 pb-8 pl-8"
          style={{ boxShadow: "-2px 0px 20px 0px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-gray-0 text-[28px] font-semibold">2번 테이블</h2>
            <Button variant="outline" className="button-lg !text-medium !rounded-[8px] !text-base">
              결제 취소
            </Button>
          </div>
          <div className="scrollbar-hide flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto pr-4">
            {POS_DETAIL_ORDER_MOCK.map((order, index) => (
              <PosPaymentsOrderBoxComp key={order.orderId}>
                <PosPaymentsOrderBoxComp.Index index={index} hasCheckbox />
                {order.orderMenus.map((menu) => (
                  <PosPaymentsOrderBoxComp.Order key={menu.orderMenuId} orderMenu={menu} />
                ))}
              </PosPaymentsOrderBoxComp>
            ))}
          </div>
          <div className="flex flex-col gap-8">
            <div className="h-0.5 w-full bg-gray-600" />
            <div className="flex items-center justify-between">
              <span className="flex-1 text-lg font-normal text-gray-300">할인</span>
              <Button
                variant="outline"
                color="black"
                className="!border-gray-[#4F4F4F] h-10 rounded-lg bg-white px-5 text-[15px] font-medium text-[#4F4F4F]"
              >
                할인수단 추가
              </Button>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="flex-1 text-lg font-normal text-gray-300">총 주문금액</span>
                  <span className="text-xl font-medium text-gray-100">
                    {(30000).toLocaleString()}원
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex-1 text-lg font-normal text-gray-300">할인된 금액</span>
                  <span className="text-primary text-xl font-medium">
                    {(17000).toLocaleString()}원
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-0 text-2xl font-semibold">결제할 금액</span>
                <span className="text-gray-0 text-4xl font-bold">{(13000).toLocaleString()}원</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-16 w-full rounded-xl border !border-gray-200 text-xl font-semibold text-gray-200"
            >
              현금 결제
            </Button>
            <Button color="black" className="h-16 w-full rounded-xl text-xl font-semibold">
              카드 결제
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default PosTablesDetailPage;
