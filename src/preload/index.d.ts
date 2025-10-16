import { ElectronAPI } from "@electron-toolkit/preload";
import { PrinterApi } from "@shared/printer/interface";

declare global {
  interface Window {
    electron: ElectronAPI;
    printer: PrinterApi;
  }
}
