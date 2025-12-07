import { CreateOrder } from "@renderer/types/domain";
import { create } from "zustand";

type CreateOrderMenu = CreateOrder["orderMenus"][number];

interface State {
  orders: CreateOrder | null;
  addMenu: (menu: CreateOrderMenu) => void;
  deleteMenu: (value: CreateOrderMenu) => void;
  updateMenu: (menu: CreateOrderMenu) => void;
  resetOrders: () => void;
}

export const usePosTablesDetailOrderStore = create<State>((set) => ({
  orders: null,
  addMenu: (menu) =>
    set((state) => ({
      orders: {
        tableNo: state.orders?.tableNo ?? 0,
        memo: state.orders?.memo ?? "",
        orderMenus: [...(state.orders?.orderMenus ?? []), menu],
      },
    })),
  deleteMenu: (menu) =>
    set((state) => ({
      orders: {
        tableNo: state.orders?.tableNo ?? 0,
        memo: state.orders?.memo ?? "",
        orderMenus:
          state.orders?.orderMenus?.filter((prevMenu) => prevMenu.menuId !== menu.menuId) ?? [],
      },
    })),
  updateMenu: (menu) =>
    set((state) => ({
      orders: {
        tableNo: state.orders?.tableNo ?? 0,
        memo: state.orders?.memo ?? "",
        orderMenus:
          state.orders?.orderMenus?.map((prevMenu) =>
            prevMenu.menuId === menu.menuId ? menu : prevMenu
          ) ?? [],
      },
    })),
  resetOrders: () => set({ orders: null }),
}));
