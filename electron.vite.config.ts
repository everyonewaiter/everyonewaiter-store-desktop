import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import { resolve } from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  main: {
    resolve: {
      alias: {
        "@main": resolve("src/main"),
        "@resources": resolve("resources"),
      },
    },
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    resolve: {
      alias: {
        "@preload": resolve("src/preload"),
        "@resources": resolve("resources"),
      },
    },
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
      },
    },
    plugins: [react(), tailwindcss(), svgr()],
  },
});
