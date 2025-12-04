import { api } from "@renderer/api";
import { Table } from "@renderer/types/domain";

export const getPosTables = async (): Promise<{ tables: Table[] }> => {
  const response = await api.get("/pos/tables");
  return response.data;
};
