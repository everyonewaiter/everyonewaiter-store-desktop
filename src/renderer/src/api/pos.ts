import { api } from "@renderer/api";
import { CreateOrderMenu, MenuCategory, Table, TableActivity } from "@renderer/types/domain";

export const getPosTables = async (): Promise<{ tables: Table[] }> => {
  const response = await api.get("/pos/tables");
  return response.data;
};

export const getMenus = async (storeId: string): Promise<{ categories: MenuCategory[] }> => {
  const response = await api.get(`/stores/${storeId}/menus`);
  return response.data;
};

export const getTableActivity = async (tableNo: number): Promise<TableActivity> => {
  const response = await api.get(`/pos/tables/${tableNo}`);
  return response.data;
};

export const addOrder = async (tableNo: number, memo: string, orders: CreateOrderMenu[]) => {
  const response = await api.post(`/orders`, {
    tableNo,
    memo,
    orderMenus: orders.map((menu) => ({
      menuId: menu.menuId,
      quantity: menu.quantity,
      menuOptionGroups: menu.menuOptionGroups.map((group) => ({
        menuOptionGroupId: group.menuOptionGroupId,
        orderOptions: group.orderOptions,
      })),
    })),
  });
  return response.data;
};

export const moveTable = async (sourceTableNo: number, targetTableNo: number) => {
  const response = await api.post(`/pos/tables/${sourceTableNo}/move/${targetTableNo}`);
  return response.data;
};
