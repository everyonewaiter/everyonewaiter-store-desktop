import storageChannel from "@shared/storage/channel";
import { StorageAPI } from "@shared/storage/interface";
import { ipcRenderer } from "electron";

export const storageAPI: StorageAPI = {
  store: (key: string, value: string) => ipcRenderer.invoke(storageChannel.STORE, key, value),
  getDeviceInfo: () => ipcRenderer.invoke(storageChannel.GET_DEVICE_INFO),
  deleteDeviceInfo: () => ipcRenderer.invoke(storageChannel.DELETE_DEVICE_INFO),
};
