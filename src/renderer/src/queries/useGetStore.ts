import { publicApi } from "@renderer/api";
import { queryKey } from "@renderer/queries/key";
import { Store } from "@renderer/types/domain";
import { useQuery } from "@tanstack/react-query";

export const useGetStore = () => {
  const { data, isSuccess, isError, isPending } = useQuery({
    queryKey: [queryKey.STORE],
    queryFn: async (): Promise<Store> => {
      const storeId = (await window.storageAPI.getDeviceInfo())?.storeId;
      const { data } = await publicApi.get(`/stores/${storeId}`);
      return data;
    },
  });

  return { store: data, isSuccess, isError, isPending };
};
