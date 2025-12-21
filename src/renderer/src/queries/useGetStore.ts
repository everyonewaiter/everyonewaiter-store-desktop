import { publicApi } from "@renderer/api";
import { queryKey } from "@renderer/queries/key";
import { Store } from "@renderer/types/domain";
import { useQuery } from "@tanstack/react-query";

export const useGetStore = (storeId: string) => {
  const { data } = useQuery({
    queryKey: [queryKey.STORE, storeId],
    queryFn: async (): Promise<Store> => {
      const { data } = await publicApi.get(`/stores/${storeId}`);
      return data;
    },
    enabled: Boolean(storeId) && storeId.length > 0,
  });

  return { store: data };
};
