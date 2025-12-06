import { getMenus } from "@renderer/api/pos";
import { queryKey } from "@renderer/queries/key";
import { useQuery } from "@tanstack/react-query";

export const useGetMenus = (storeId: string) => {
  return useQuery({
    queryKey: [queryKey.STORE, storeId],
    queryFn: () => getMenus(storeId),
    enabled: !!storeId,
  });
};
