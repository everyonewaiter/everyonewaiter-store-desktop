import { useEffect, useRef } from "react";
import { api } from "@renderer/api";
import { queryKey } from "@renderer/queries/key";
import { Device } from "@renderer/types/domain";
import { storageKey } from "@shared/storage/key";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export const useGetDevice = () => {
  const prevPurposeRef = useRef<string | null>(null);

  const { data, error, isSuccess, isError, isPending } = useQuery({
    queryKey: [queryKey.DEVICE],
    queryFn: async (): Promise<Device> => {
      const { data } = await api.get("/devices");
      return data;
    },
  });

  useEffect(() => {
    if (data && isSuccess) {
      (async () => {
        await Promise.all([
          window.storageAPI.store(storageKey.DEVICE_ID, data.deviceId),
          window.storageAPI.store(storageKey.STORE_ID, data.storeId),
          window.storageAPI.store(storageKey.DEVICE_TYPE, data.purpose),
        ]);
      })();

      // purpose 변경 감지 및 리다이렉트
      if (prevPurposeRef.current !== null && prevPurposeRef.current !== data.purpose) {
        const currentPath = globalThis.window.location.hash;
        const targetPath = `#/${data.purpose.toLowerCase()}`;
        if (currentPath !== targetPath) {
          globalThis.window.location.href = targetPath;
        }
      }
      prevPurposeRef.current = data.purpose;
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && isAxiosError(error) && error.response?.status === 404) {
      (async () => {
        await window.storageAPI.deleteDeviceInfo();
      })();
    }
  }, [isError, error]);

  return { device: data, isSuccess, isError, isPending };
};
