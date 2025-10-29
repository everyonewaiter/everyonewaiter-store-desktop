import { V1 as BaseApi } from "@renderer/api/base/V1";
import { V1 as DeviceApi } from "@renderer/api/device/V1";

export const baseApi = new BaseApi({
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
