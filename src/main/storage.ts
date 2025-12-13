import { StorageDeviceInfo, StorageDeviceType } from "@shared/storage/interface";
import { storageKey } from "@shared/storage/key";
import Store from "electron-store";

const store = new Store();

export const storeStorage = (key: string, value: string) => {
  store.set(key, value);
  return true;
};

export const getDeviceInfo = (): StorageDeviceInfo | null => {
  const deviceId = store.get(storageKey.DEVICE_ID) as string;
  const storeId = store.get(storageKey.STORE_ID) as string;
  const secretKey = store.get(storageKey.DEVICE_SECRET_KEY) as string;
  const deviceType = store.get(storageKey.DEVICE_TYPE) as StorageDeviceType;

  if (!deviceId || !storeId || !secretKey || !deviceType) {
    return null;
  }
  return { deviceId, storeId, secretKey, deviceType };
};

export const deleteDeviceInfo = () => {
  store.delete(storageKey.DEVICE_ID);
  store.delete(storageKey.STORE_ID);
  store.delete(storageKey.DEVICE_SECRET_KEY);
  store.delete(storageKey.DEVICE_TYPE);
  return true;
};
