import { useNavigate } from "react-router-dom";
import Button from "@renderer/components/Button/Button";
import { Dialog } from "@renderer/components/Dialog";
import { useGetDevice } from "@renderer/hooks/useGetDevice";
import { useGetMenus } from "@renderer/hooks/usePosTablesDetailApi";
import { usePosTablesDetailOrderStore } from "@renderer/hooks/usePosTablesDetailOrderStore";
import OrderBox from "@renderer/pages/pos/payments/PosPaymentsOrderBoxComp";
import { getFormattedTableNo } from "@renderer/utils/format";
import { overlay } from "overlay-kit";

interface PosTablesDetailApprovalSideCompProps {
  tableNo: number;
  onApproval: () => void;
}

function PosTablesDetailApprovalSideComp({
  tableNo,
  onApproval,
}: Readonly<PosTablesDetailApprovalSideCompProps>) {
  const navigate = useNavigate();
  const { device } = useGetDevice();
  const { data: categories } = useGetMenus(device?.storeId ?? "");
  const { orders, updateMenuQuantity } = usePosTablesDetailOrderStore();

  const allMenus = categories?.categories?.flatMap((category) => category.menus) ?? [];

  const calculateTotalPrice = () => {
    return (
      orders?.reduce((acc, cur) => {
        const selectedMenu = allMenus?.find((menu) => String(menu.menuId) === String(cur.menuId));
        const selectedOptions = cur.menuOptionGroups.flatMap((group) => group.orderOptions);

        return (
          acc +
          ((selectedMenu?.price ?? 0) + selectedOptions.reduce((a, b) => a + b.price, 0)) *
            cur.quantity
        );
      }, 0) ?? 0
    );
  };

  const handleCheckReject = () => {
    overlay.open((overlayProps) => (
      <Dialog open={overlayProps.isOpen} onOpenChange={overlayProps.close}>
        <Dialog.Wrapper>
          <Dialog.Title>
            <h2 className="text-gray-0 text-xl font-semibold">
              T-{tableNo}의 주문을 거부하시겠습니까?
            </h2>
          </Dialog.Title>
          <Dialog.Footer
            layout="balanced"
            buttonSize="xl"
            primaryButton={{
              color: "primary",
              text: "거부하기",
              onClick: () => {
                // TODO: 거부 api 호출 후 아래 코드 실행
                overlayProps.close();
                navigate("/pos/tables");
                handleShowRejectDialog();
              },
            }}
            secondaryButton={{
              onClick: overlayProps.close,
            }}
          />
        </Dialog.Wrapper>
      </Dialog>
    ));
  };

  const handleShowRejectDialog = () => {
    setTimeout(() => {
      overlay.open((overlayProps) => (
        <Dialog open={overlayProps.isOpen} onOpenChange={overlayProps.close}>
          <Dialog.Wrapper>
            <Dialog.Title>
              <h2 className="text-primary text-xl font-semibold">
                T-{tableNo}의 주문이 거부되었습니다.
              </h2>
              <span className="text-gray-0 text-lg font-medium">
                해당 테이블에 돌아가 재주문을 요청해주세요.
              </span>
            </Dialog.Title>
            <Dialog.Footer>
              <Dialog.Close className="button-xl w-full cursor-pointer bg-gray-700 text-gray-300">
                확인
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Wrapper>
        </Dialog>
      ));
    }, 100);
  };

  const handleShowApprovalDialog = () => {
    setTimeout(() => {
      overlay.open((overlayProps) => (
        <Dialog open={overlayProps.isOpen} onOpenChange={overlayProps.close}>
          <Dialog.Wrapper>
            <Dialog.Title>
              <h2 className="text-primary text-xl font-semibold">
                T-{tableNo}의 결제가 완료되었습니다.
              </h2>
              <span className="text-gray-0 text-lg font-medium">메뉴 조리를 시작합니다.</span>
            </Dialog.Title>
            <Dialog.Footer>
              <Dialog.Close className="button-xl w-full cursor-pointer bg-gray-700 text-gray-300">
                확인
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Wrapper>
        </Dialog>
      ));
    }, 100);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-gray-0 text-[28px] font-semibold">
          {getFormattedTableNo(tableNo)} 승인 대기 내역
        </h2>
      </div>
      <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto">
        <div className="flex w-full flex-col gap-2">
          {orders && orders.length > 0 && (
            <OrderBox>
              <OrderBox.Body>
                {orders?.map((menu, index) => (
                  <OrderBox.Order
                    key={menu.menuId}
                    orderMenu={menu}
                    onUpdateOrder={(type) => updateMenuQuantity(menu.menuId, index, type)}
                  />
                ))}
              </OrderBox.Body>
            </OrderBox>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="h-0.5 w-full bg-gray-600" />
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-0 text-2xl font-semibold">결제할 금액</span>
            <span className="text-gray-0 text-4xl font-bold">
              {calculateTotalPrice().toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          color="black"
          variant="outline"
          className="h-16 w-full rounded-xl border-gray-200 text-xl font-semibold text-gray-200"
          onClick={handleCheckReject}
        >
          거부
        </Button>
        <Button
          color="primary"
          className="h-16 w-full rounded-xl text-xl font-semibold"
          onClick={() => {
            onApproval();
            handleShowApprovalDialog();
          }}
        >
          승인
        </Button>
      </div>
    </>
  );
}

export default PosTablesDetailApprovalSideComp;
