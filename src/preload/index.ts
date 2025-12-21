import { electronAPI } from "@electron-toolkit/preload";
import printer from "@preload/printer";
import { storageAPI } from "@preload/storage";
import { contextBridge } from "electron";

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("printer", printer);
    contextBridge.exposeInMainWorld("storageAPI", storageAPI);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.printer = printer;
  // @ts-ignore (define in dts)
  window.storageAPI = storageAPI;
}
