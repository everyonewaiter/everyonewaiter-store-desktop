import { api } from "@renderer/api";
import { queryClient } from "@renderer/queries/client";
import { queryKey } from "@renderer/queries/key";
import { useMutation } from "@tanstack/react-query";

export const useControlStoreStatus = () => {
  const open = useMutation({
    mutationFn: async () => {
      await api.post("/stores/open");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.STORE] });
    },
  });

  const close = useMutation({
    mutationFn: async () => {
      await api.post("/stores/close");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.STORE] });
    },
  });

  return { openStore: open, closeStore: close };
};
