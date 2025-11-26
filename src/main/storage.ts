import { StorageDeviceInfo, StorageDeviceType } from "@shared/storage/interface";
import keytar from "keytar";

const SERVICE = process.env.KEYTAR_SERVICE || "everyonewaiter-store-desktop";
const DEVICE_ID = "device-id";
const STORE_ID = "store-id";
const DEVICE_SECRET_KEY = "device-secret-key";
const DEVICE_TYPE = "device-type";

export const saveDeviceInfo = async ({
  deviceId,
  storeId,
  secretKey,
  deviceType,
}: StorageDeviceInfo) => {
  await Promise.all([
    keytar.setPassword(SERVICE, DEVICE_ID, deviceId),
    keytar.setPassword(SERVICE, STORE_ID, storeId),
    keytar.setPassword(SERVICE, DEVICE_SECRET_KEY, secretKey),
    keytar.setPassword(SERVICE, DEVICE_TYPE, deviceType),
  ]);
  return true;
};

export const getDeviceInfo = async (): Promise<StorageDeviceInfo | null> => {
  const [deviceId, storeId, secretKey, deviceType] = await Promise.all([
    keytar.getPassword(SERVICE, DEVICE_ID),
    keytar.getPassword(SERVICE, STORE_ID),
    keytar.getPassword(SERVICE, DEVICE_SECRET_KEY),
    keytar.getPassword(SERVICE, DEVICE_TYPE),
  ]);

  if (!deviceId || !storeId || !secretKey || !deviceType) {
    return null;
  }
  return { deviceId, storeId, secretKey, deviceType: deviceType as StorageDeviceType };
};

export const deleteDeviceInfo = async () => {
  await Promise.all([
    keytar.deletePassword(SERVICE, DEVICE_ID),
    keytar.deletePassword(SERVICE, STORE_ID),
    keytar.deletePassword(SERVICE, DEVICE_SECRET_KEY),
    keytar.deletePassword(SERVICE, DEVICE_TYPE),
  ]);
  return true;
};
