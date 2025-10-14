import { ElectronAPI } from "@electron-toolkit/preload";
import { Printer } from "@preload/printer";

declare global {
  interface Window {
    electron: ElectronAPI;
    printer: Printer;
  }
}
