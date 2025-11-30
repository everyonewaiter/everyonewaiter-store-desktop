import { api } from "@renderer/api";
import { useMutation } from "@tanstack/react-query";

export const useOrderServe = () => {
  return useMutation({
    mutationFn: async (orderId: string) => await api.post(`/orders/${orderId}/serving`),
  });
};

export const useOrderMenuServe = () => {
  return useMutation({
    mutationFn: async ({ orderId, orderMenuId }: { orderId: string; orderMenuId: string }) =>
      await api.post(`/orders/${orderId}/menus/${orderMenuId}/serving`),
  });
};

export const useStaffCallComplete = () => {
  return useMutation({
    mutationFn: async (staffCallId: string) => await api.post(`/orders/${staffCallId}/complete`),
  });
};
