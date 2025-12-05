import { getPosTables } from "@renderer/api/pos";
import { queryKey } from "@renderer/queries/key";
import { useQuery } from "@tanstack/react-query";

export const useGetPosTables = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: [queryKey.POS],
    queryFn: getPosTables,
  });

  return { tables: data?.tables, isPending, isError };
};
