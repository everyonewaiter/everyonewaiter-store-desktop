import { api } from "@renderer/api";
import { queryKey } from "@renderer/queries/key";
import { Waiting } from "@renderer/types/domain";
import { useQuery } from "@tanstack/react-query";

export const useGetWaitings = () => {
  const { data } = useQuery({
    queryKey: [queryKey.WAITING],
    queryFn: async (): Promise<{ waitings: Waiting[] }> => {
      const { data } = await api.get("/waitings");
      return data;
    },
  });

  return { waitings: data?.waitings ?? [] };
};
