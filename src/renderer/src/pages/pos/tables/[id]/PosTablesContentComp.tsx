import { Fragment } from "react/jsx-runtime";
import { NoteIcon, ReturnIcon, RotateIcon, SaveIcon, SendIcon } from "@renderer/assets/icons";
import { Button } from "@renderer/components";
import PosHeaderComp from "@renderer/pages/pos/PosHeaderComp";
import PosTablesDetailMenuCardComp from "@renderer/pages/pos/tables/[id]/PosTablesDetailMenuCardComp";
import { CATEGORY_MOCK, MENU_LIST_MOCK } from "../../mock";

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

function PosTablesContentComp() {
  return (
    <div className="relative flex flex-[calc(1-0.3375)] flex-col">
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
      <div className="scrollbar-hide h-full overflow-y-auto pb-20">
        <div className="grid grid-cols-4 gap-x-6 gap-y-10 px-15 py-6">
          {MENU_LIST_MOCK.menus.map((menu) => (
            <PosTablesDetailMenuCardComp key={menu.menuId} name={menu.name} price={menu.price} />
          ))}
          {MENU_LIST_MOCK.menus.map((menu) => (
            <PosTablesDetailMenuCardComp key={menu.menuId} name={menu.name} price={menu.price} />
          ))}
          {MENU_LIST_MOCK.menus.map((menu) => (
            <PosTablesDetailMenuCardComp key={menu.menuId} name={menu.name} price={menu.price} />
          ))}
          {MENU_LIST_MOCK.menus.map((menu) => (
            <PosTablesDetailMenuCardComp key={menu.menuId} name={menu.name} price={menu.price} />
          ))}
        </div>
      </div>
      <nav
        className="fixed bottom-6 z-50 flex items-center rounded-[40px] bg-white px-10 py-6"
        style={{
          boxShadow: "0px 0px 24px 0px rgba(0, 0, 0, 0.08)",
          left: "33.125%",
          transform: "translateX(-50%)",
        }}
      >
        {floatingAction.map((action, index) => (
          <Fragment key={action.label}>
            <button
              type="button"
              className="text-gray-0 flex h-full cursor-pointer flex-row items-center gap-2 px-6 text-xl font-normal whitespace-nowrap"
            >
              {action.icon}
              {action.label}
            </button>
            {index !== floatingAction.length - 1 && <div className="h-5 w-[1px] bg-gray-600" />}
          </Fragment>
        ))}
      </nav>
    </div>
  );
}

export default PosTablesContentComp;
