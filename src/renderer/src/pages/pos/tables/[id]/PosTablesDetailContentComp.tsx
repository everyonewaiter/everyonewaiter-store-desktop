import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { useNavigate, useParams } from "react-router-dom";
import { NoteIcon, ReturnIcon, RotateIcon, SendIcon } from "@renderer/assets/icons";
import { LogoTextIcon } from "@renderer/assets/logos";
import Button from "@renderer/components/Button/Button";
import { useGetDevice } from "@renderer/hooks/useGetDevice";
import { useGetMenus, useGetTableActivity } from "@renderer/hooks/usePosTablesDetailApi";
import PosHeaderComp from "@renderer/pages/pos/PosHeaderComp";
import PosTablesDetailMemoModalComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailMemoModalComp";
import PosTablesDetailMenuCardComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailMenuCardComp";
import PosTablesDetailResendReceiptModalComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailResendReceiptModalComp";
import cn from "@renderer/utils/cn";
import { overlay } from "overlay-kit";

function PosTablesDetailContentComp() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const floatingAction = [
    {
      label: "좌석 이동",
      icon: <RotateIcon width={28} height={28} color="#292D32" />,
      onClick: () => navigate(`/pos/tables?currentTableNo=${id}`),
    },
    {
      label: "메모",
      icon: <NoteIcon width={28} height={28} color="#292D32" />,
      onClick: () =>
        overlay.open(
          (overlayProps) => <PosTablesDetailMemoModalComp tableNo={Number(id)} {...overlayProps} />,
          {
            overlayId: "pos-tables-detail-memo-modal",
          }
        ),
    },
    {
      label: "주방 재전송",
      icon: <SendIcon width={28} height={28} color="#292D32" />,
      onClick: () =>
        overlay.open(
          (overlayProps) => (
            <PosTablesDetailResendReceiptModalComp tableNo={Number(id)} {...overlayProps} />
          ),
          {
            overlayId: "pos-tables-detail-resend-receipt-modal",
          }
        ),
    },
    {
      label: "테이블 목록으로 이동",
      icon: <ReturnIcon width={28} height={28} color="#292D32" />,
      onClick: () => navigate("/pos/tables"),
    },
  ];

  const { device } = useGetDevice();
  const { data } = useGetMenus(device?.storeId ?? "");
  const { data: activity } = useGetTableActivity(Number(id));

  const floating =
    activity?.orders?.length && activity.orders.length > 0
      ? floatingAction
      : floatingAction.slice(-1);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredMenus = selectedCategory
    ? (data?.categories?.find((c) => c.categoryId === selectedCategory)?.menus ?? [])
    : (data?.categories?.flatMap((category) => category.menus) ?? []);

  const categoryStyle = (isValid: boolean) =>
    cn(
      "border-gray-[#4F4F4F] h-10 rounded-lg border px-5 text-[#4F4F4F] hover:bg-transparent hover:text-[#4F4F4F]",
      isValid && "bg-primary border-primary text-white hover:bg-primary hover:text-white"
    );

  return (
    <div className="relative flex flex-[calc(1-0.3375)] flex-col">
      <PosHeaderComp />
      <div className="flex items-center gap-3 px-15 pt-10 pb-6">
        <Button
          variant="outline"
          color="black"
          className={categoryStyle(selectedCategory === null)}
          onClick={() => setSelectedCategory(null)}
        >
          전체
        </Button>
        {data?.categories?.map((category) => (
          <Button
            variant="outline"
            color="black"
            className={categoryStyle(selectedCategory === category.categoryId)}
            key={category.categoryId}
            onClick={() => setSelectedCategory(category.categoryId)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      <div className="scrollbar-hide h-full overflow-y-auto pb-20">
        {filteredMenus.length > 0 ? (
          <div className="grid grid-cols-4 gap-x-6 gap-y-10 px-15 pt-3 pb-6">
            {filteredMenus.map((menu) => (
              <PosTablesDetailMenuCardComp key={menu.menuId} menu={menu} />
            ))}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center pb-20">
            <LogoTextIcon className="h-[80px] opacity-5 grayscale" />
          </div>
        )}
      </div>
      <nav
        className={cn(
          "fixed bottom-6 z-50 flex items-center rounded-[40px] bg-white py-6",
          activity?.orders?.length && activity.orders.length > 0 ? "px-10" : "px-4"
        )}
        style={{
          boxShadow: "0px 0px 24px 0px rgba(0, 0, 0, 0.08)",
          left: "33.125%",
          transform: "translateX(-50%)",
        }}
      >
        {floating.map((action, index) => (
          <Fragment key={action.label}>
            <button
              type="button"
              className="text-gray-0 flex h-full cursor-pointer flex-row items-center gap-2 px-6 text-xl font-normal whitespace-nowrap"
              onClick={action.onClick}
            >
              {action.icon}
              {action.label}
            </button>
            {index !== floating.length - 1 && <div className="h-5 w-[1px] bg-gray-600" />}
          </Fragment>
        ))}
      </nav>
    </div>
  );
}

export default PosTablesDetailContentComp;
