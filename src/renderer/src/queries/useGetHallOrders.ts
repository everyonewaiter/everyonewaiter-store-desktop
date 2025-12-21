import { api } from "@renderer/api";
import { queryKey } from "@renderer/queries/key";
import { Order } from "@renderer/types/domain";
import { useQuery } from "@tanstack/react-query";

export const useGetHallOrders = () => {
  const { data } = useQuery({
    queryKey: [queryKey.HALL, queryKey.ORDER],
    queryFn: async (): Promise<{ served: Order[]; unserved: Order[] }> => {
      const { data } = await api.get("/orders/hall");
      return data;
    },
  });

  return { orders: data ?? { served: [], unserved: [] } };
};
