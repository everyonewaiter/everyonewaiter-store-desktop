import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@renderer/App";
import { OverlayProvider } from "overlay-kit";
import "@renderer/assets/main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OverlayProvider>
      <App />
    </OverlayProvider>
  </StrictMode>
);
