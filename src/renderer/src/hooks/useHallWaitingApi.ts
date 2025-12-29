import { api } from "@renderer/api";
import { useMutation } from "@tanstack/react-query";

export const useWaitingComplete = () => {
  return useMutation({
    mutationFn: async (waitingId: string) => await api.post(`/waitings/${waitingId}/complete`),
  });
};

export const useWaitingCustomerCall = () => {
  return useMutation({
    mutationFn: async (waitingId: string) => await api.post(`/waitings/${waitingId}/call`),
  });
};

export const useWaitingCancel = () => {
  return useMutation({
    mutationFn: async (waitingId: string) => await api.post(`/waitings/${waitingId}/cancel`),
  });
};
