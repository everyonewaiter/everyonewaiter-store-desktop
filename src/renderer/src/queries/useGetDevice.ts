import { useEffect } from "react";
import { api } from "@renderer/api";
import { queryKey } from "@renderer/queries/key";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export const useGetDevice = () => {
  const { data, error, isSuccess, isError, isPending } = useQuery({
    queryKey: [queryKey.DEVICE],
    queryFn: async () => {
      const { data } = await api.get("/devices");
      return data;
    },
  });

  useEffect(() => {
    if (data && isSuccess) {
      (async () => {
        await window.storageAPI.storeDeviceInfo({
          deviceId: data.deviceId,
          storeId: data.storeId,
          secretKey: data.secretKey,
          deviceType: data.deviceType,
        });
      })();
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
