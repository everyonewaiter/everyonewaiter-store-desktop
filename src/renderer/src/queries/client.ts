import { handleApiError } from "@renderer/utils/handle-api-error";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
      onError: (error) => handleApiError(error),
    },
  },
});
