import { electronAPI } from "@electron-toolkit/preload";
import printer from "@preload/printer";
import { contextBridge } from "electron";

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("printer", printer);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.printer = printer;
}
