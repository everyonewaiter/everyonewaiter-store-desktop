import { addOrder, getMenus, getTableActivity } from "@renderer/api/pos";
import { queryKey } from "@renderer/queries/key";
import { CreateOrderMenu } from "@renderer/types/domain";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useAddOrder = () => {
  return useMutation({
    mutationFn: async ({
      tableNo,
      memo,
      orders,
    }: {
      tableNo: number;
      memo: string;
      orders: CreateOrderMenu[];
    }) => await addOrder(tableNo, memo, orders),
  });
};
