import { ipcRenderer } from "electron";

export const storageAPI = {
  storeDeviceInfo: (data: { deviceId: string; secretKey: string; deviceType: "POS" | "HALL" }) =>
    ipcRenderer.invoke("store-device-info", data),
  getDeviceInfo: () => ipcRenderer.invoke("get-device-info"),
  deleteDeviceInfo: () => ipcRenderer.invoke("delete-device-info"),
};
