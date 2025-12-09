import { api } from "@renderer/api";
import { MenuCategory, Table } from "@renderer/types/domain";

export const getPosTables = async (): Promise<{ tables: Table[] }> => {
  const response = await api.get("/pos/tables");
  return response.data;
};

export const getMenus = async (storeId: string): Promise<{ categories: MenuCategory[] }> => {
  const response = await api.get(`/stores/${storeId}/menus`);
  return response.data;
};
