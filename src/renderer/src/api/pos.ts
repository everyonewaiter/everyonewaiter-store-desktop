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

export const updateOrder = async (
  tableNo: number,
  orders: { orderId: string; orderMenus: { orderMenuId: string; quantity: number }[] }[]
) => {
  const response = await api.put(`/pos/tables/${tableNo}/orders`, { orders });
  return response.data;
};

export const cancelOrder = async (tableNo: number, orderId: string) => {
  const response = await api.post(`/pos/tables/${tableNo}/orders/${orderId}/cancel`);
  return response.data;
};

export const discountOrder = async (tableNo: number, discountPrice: number) => {
  const response = await api.post(`/pos/tables/${tableNo}/discount`, { discountPrice });
  return response.data;
};

export const moveTable = async (sourceTableNo: number, targetTableNo: number) => {
  const response = await api.post(`/pos/tables/${sourceTableNo}/move/${targetTableNo}`);
  return response.data;
};

export const updateMemo = async (tableNo: number, orderId: string, memo: string) => {
  const response = await api.put(`/pos/tables/${tableNo}/orders/${orderId}/memo`, { memo });
  return response.data;
};

export const completeTable = async (tableNo: number) => {
  const response = await api.post(`/pos/tables/${tableNo}/complete`);
  return response.data;
};
