import { ElectronAPI } from "@electron-toolkit/preload";
import { PrinterApi } from "@shared/printer/interface";

declare global {
  interface Window {
    electron: ElectronAPI;
    printer: PrinterApi;
    storageAPI: {
      storeDeviceInfo: (data: {
        deviceId: string;
        secretKey: string;
        deviceType: "POS" | "HALL";
      }) => Promise<boolean>;
      getDeviceInfo: () => Promise<{
        deviceId: string;
        secretKey: string;
        deviceType: "POS" | "HALL";
      }>;
    };
  }
}
