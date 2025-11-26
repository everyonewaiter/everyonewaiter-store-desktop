type StorageDeviceType = "POS" | "HALL";

interface StorageDeviceInfo {
  deviceId: string;
  storeId: string;
  secretKey: string;
  deviceType: StorageDeviceType;
}

interface StorageAPI {
  storeDeviceInfo: (data: StorageDeviceInfo) => Promise<boolean>;
  getDeviceInfo: () => Promise<StorageDeviceInfo>;
  deleteDeviceInfo: () => Promise<boolean>;
}

export type { StorageAPI, StorageDeviceInfo, StorageDeviceType };
