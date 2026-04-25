import { api } from "@renderer/api";
import { useMutation } from "@tanstack/react-query";

export const useOrderServe = () => {
  return useMutation({
    mutationFn: async ({ tableNo, resourceId }: { tableNo: number; resourceId: string }) =>
      await api.post(`/orders/${resourceId}/serving?tableNo=${tableNo}`),
  });
};

export const useOrderMenuServe = () => {
  return useMutation({
    mutationFn: async ({
      tableNo,
      orderId,
      orderMenuId,
    }: {
      tableNo: number;
      orderId: string;
      orderMenuId: string;
    }) => await api.post(`/orders/${orderId}/menus/${orderMenuId}/serving?tableNo=${tableNo}`),
  });
};

export const useStaffCallComplete = () => {
  return useMutation({
    mutationFn: async ({ tableNo, resourceId }: { tableNo: number; resourceId: string }) =>
      await api.post(`/orders/staff-calls/${resourceId}/complete?tableNo=${tableNo}`),
  });
};
