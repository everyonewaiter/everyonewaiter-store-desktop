import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { queryClient } from "@renderer/api/queryClient";
import App from "@renderer/App";
import PrinterProvider from "@renderer/providers/printerProvider";
import SseProvider from "@renderer/providers/sseProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@renderer/assets/main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <PrinterProvider>
        <SseProvider>
          <App />
        </SseProvider>
      </PrinterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
