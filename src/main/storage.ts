import { StorageDeviceInfo, StorageDeviceType } from "@shared/storage/interface";
import { storageKey } from "@shared/storage/key";
import keytar from "keytar";

const SERVICE = process.env.KEYTAR_SERVICE || "everyonewaiter-store-desktop";

export const storeStorage = async (key: string, value: string) => {
  await keytar.setPassword(SERVICE, key, value);
  return true;
};

export const getDeviceInfo = async (): Promise<StorageDeviceInfo | null> => {
  const [deviceId, storeId, secretKey, deviceType] = await Promise.all([
    keytar.getPassword(SERVICE, storageKey.DEVICE_ID),
    keytar.getPassword(SERVICE, storageKey.STORE_ID),
    keytar.getPassword(SERVICE, storageKey.DEVICE_SECRET_KEY),
    keytar.getPassword(SERVICE, storageKey.DEVICE_TYPE),
  ]);

  if (!deviceId || !storeId || !secretKey || !deviceType) {
    return null;
  }
  return { deviceId, storeId, secretKey, deviceType: deviceType as StorageDeviceType };
};

export const deleteDeviceInfo = async () => {
  await Promise.all([
    keytar.deletePassword(SERVICE, storageKey.DEVICE_ID),
    keytar.deletePassword(SERVICE, storageKey.STORE_ID),
    keytar.deletePassword(SERVICE, storageKey.DEVICE_SECRET_KEY),
    keytar.deletePassword(SERVICE, storageKey.DEVICE_TYPE),
  ]);
  return true;
};
