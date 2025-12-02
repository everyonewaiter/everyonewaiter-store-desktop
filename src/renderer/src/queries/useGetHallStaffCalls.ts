import { api } from "@renderer/api";
import { queryKey } from "@renderer/queries/key";
import { StaffCall } from "@renderer/types/domain";
import { useQuery } from "@tanstack/react-query";

export const useGetHallStaffCalls = () => {
  const { data } = useQuery({
    queryKey: [queryKey.HALL, queryKey.STAFF_CALL],
    queryFn: async (): Promise<{ staffCalls: StaffCall[] }> => {
      const { data } = await api.get("/orders/staff-calls");
      return data;
    },
  });

  return { staffCalls: data?.staffCalls ?? [] };
};
