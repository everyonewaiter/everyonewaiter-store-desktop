import { getMenus, getTableActivity } from "@renderer/api/pos";
import { queryKey } from "@renderer/queries/key";
import { useQuery } from "@tanstack/react-query";

export const useGetMenus = (storeId: string) => {
  return useQuery({
    queryKey: [queryKey.MENU, storeId],
    queryFn: () => getMenus(storeId),
    enabled: !!storeId,
  });
};

export const useGetTableActivity = (tableNo: number) => {
  return useQuery({
    queryKey: [queryKey.POS, tableNo],
    queryFn: () => getTableActivity(tableNo),
    enabled: !!tableNo,
  });
};
