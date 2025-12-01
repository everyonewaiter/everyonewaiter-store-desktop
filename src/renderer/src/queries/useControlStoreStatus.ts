import { api } from "@renderer/api";
import { useMutation } from "@tanstack/react-query";

export const useControlStoreStatus = () => {
  const open = useMutation({
    mutationFn: async () => {
      await api.post("/stores/open");
    },
  });

  const close = useMutation({
    mutationFn: async () => {
      await api.post("/stores/close");
    },
  });

  return { openStore: open, closeStore: close };
};
