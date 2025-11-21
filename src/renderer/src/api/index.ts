import makeSignature from "@renderer/utils/make-signature";
import axios from "axios";

const API_BASE_URL = `${
  import.meta.env.DEV
    ? import.meta.env.VITE_API_BASE_URL_DEV
    : import.meta.env.VITE_API_BASE_URL_PROD
}/v1`;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const { deviceId, secretKey, deviceType } = await window.storageAPI.getDeviceInfo();
  const method = config.method?.toUpperCase() || "GET";
  const rawUrl = config.url || "/";
  const searchParams = new URLSearchParams(config.params).toString();
  const uri = searchParams ? `${rawUrl}?${searchParams}` : rawUrl;

  if (!deviceId || !secretKey || !deviceType) {
    throw new Error("Device info not found");
  }

  const timestamp = Date.now().toString();
  const signature = makeSignature({
    uri: `/v1${uri}`,
    method,
    secretKey,
    deviceId,
    timestamp,
  });

  config.headers = config.headers || {};
  config.headers["x-ew-access-key"] = deviceId;
  config.headers["x-ew-signature"] = signature;
  config.headers["x-ew-timestamp"] = timestamp;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export const publicApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
