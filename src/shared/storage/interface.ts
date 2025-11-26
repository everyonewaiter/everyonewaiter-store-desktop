type StorageDeviceType = "POS" | "HALL" | "WAITING" | "TABLE";

interface StorageDeviceInfo {
  deviceId: string;
  storeId: string;
  secretKey: string;
  deviceType: StorageDeviceType;
}

interface StorageAPI {
  store: (key: string, value: string) => Promise<boolean>;
  getDeviceInfo: () => Promise<StorageDeviceInfo | null>;
  deleteDeviceInfo: () => Promise<boolean>;
}

export type { StorageAPI, StorageDeviceInfo, StorageDeviceType };
