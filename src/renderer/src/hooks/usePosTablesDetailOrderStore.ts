import { CreateOrderMenu } from "@renderer/types/domain";
import { create } from "zustand";

interface State {
  orders: CreateOrderMenu[] | null;
  tableNo: number;
  setTableNo: (tableNo: number) => void;
  addMenu: (menu: CreateOrderMenu) => void;
  updateMenuQuantity: (menuId: string, orderIndex: number, action: "add" | "sub") => void; // 수량 변경
  resetOrders: () => void;
}

function isSameMenu(a: CreateOrderMenu, b: CreateOrderMenu) {
  if (a.menuId !== b.menuId) return false;
  if (a.menuOptionGroups.length !== b.menuOptionGroups.length) return false;

  return a.menuOptionGroups.every((groupA) => {
    const groupB = b.menuOptionGroups.find((g) => g.menuOptionGroupId === groupA.menuOptionGroupId);
    if (!groupB) return false;

    if (groupA.orderOptions.length !== groupB.orderOptions.length) return false;

    const sortedA = [...groupA.orderOptions].sort((x, y) => x.name.localeCompare(y.name));
    const sortedB = [...groupB.orderOptions].sort((x, y) => x.name.localeCompare(y.name));

    return sortedA.every(
      (opt, idx) => opt.name === sortedB[idx].name && opt.price === sortedB[idx].price
    );
  });
}

export const usePosTablesDetailOrderStore = create<State>((set) => ({
  orders: null,
  tableNo: 0,
  setTableNo: (tableNo: number) => set({ tableNo }),
  addMenu: (menu: CreateOrderMenu) =>
    set((state) => {
      const orders = [...(state.orders ?? [])];
      const targetIndex = orders.findIndex((item) => isSameMenu(item, menu));

      // NOTE: 일치하는 메뉴가 있으면 quantity 합산
      if (targetIndex !== -1) {
        const target = orders[targetIndex];
        const unitPrice = target.totalPrice / target.quantity;
        const newQuantity = target.quantity + menu.quantity;
        orders[targetIndex] = {
          ...target,
          quantity: newQuantity,
          totalPrice: unitPrice * newQuantity,
        };
        return { orders };
      }

      // NOTE: 일치하는 메뉴가 없으면 새로 추가
      return {
        orders: [...orders, menu],
      };
    }),

  updateMenuQuantity: (menuId: string, orderIndex: number, action: "add" | "sub") => {
    set((state) => {
      const orders = [...(state.orders ?? [])];
      const target = orders[orderIndex];

      if (!target || target.menuId !== menuId) return { orders };

      // NOTE: 현재 수량 1 + 수량 감소 시 메뉴 삭제
      if (action === "sub" && target.quantity === 1) {
        orders.splice(orderIndex, 1);
        return { orders };
      }

      const newQty = action === "add" ? target.quantity + 1 : target.quantity - 1;
      const unitPrice = target.totalPrice / target.quantity;
      orders[orderIndex] = {
        ...target,
        quantity: newQty,
        totalPrice: unitPrice * newQty,
      };

      return { orders };
    });
  },
  resetOrders: () => set({ orders: null }),
}));
