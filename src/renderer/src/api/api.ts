import { V1 as DeviceApi } from "@renderer/api/device/V1";
import { V1 as OwnerApi } from "@renderer/api/owner/V1";

export const ownerApi = new OwnerApi({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const deviceApi = new DeviceApi({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
