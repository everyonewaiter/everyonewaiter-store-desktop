import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@renderer/App";
import SseProvider from "@renderer/providers/sseProvider";
import { queryClient } from "@renderer/queries/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { OverlayProvider } from "overlay-kit";
import "@renderer/assets/main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SseProvider>
        <OverlayProvider>
          <App />
        </OverlayProvider>
      </SseProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
