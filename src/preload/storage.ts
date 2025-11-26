import storageChannel from "@shared/storage/channel";
import { StorageAPI, StorageDeviceInfo } from "@shared/storage/interface";
import { ipcRenderer } from "electron";

export const storageAPI: StorageAPI = {
  storeDeviceInfo: (data: StorageDeviceInfo) =>
    ipcRenderer.invoke(storageChannel.SAVE_DEVICE_INFO, data),
  getDeviceInfo: () => ipcRenderer.invoke(storageChannel.GET_DEVICE_INFO),
  deleteDeviceInfo: () => ipcRenderer.invoke(storageChannel.DELETE_DEVICE_INFO),
};
