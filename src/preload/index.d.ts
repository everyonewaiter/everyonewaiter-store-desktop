import { ElectronAPI } from "@electron-toolkit/preload";
import { PrinterAPI } from "@shared/printer/interface";
import { StorageAPI } from "@shared/storage/interface";

declare global {
  interface Window {
    electron: ElectronAPI;
    printer: PrinterAPI;
    storageAPI: StorageAPI;
  }
}
