import { getPosTables } from "@renderer/api/pos";
import { queryKey } from "@renderer/hooks/queryKey";
import { useQuery } from "@tanstack/react-query";

export const useGetPosTables = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: [queryKey.POS, queryKey.TABLES],
    queryFn: getPosTables,
  });

  return { tables: data?.tables, isPending, isError };
};
