import { createContext, PropsWithChildren, useEffect, useRef } from "react";
import EventSource, { EventSourceListener } from "react-native-sse";
import { queryKey } from "@renderer/queries/key";
import { useGetDevice } from "@renderer/queries/useGetDevice";
import makeSignature from "@renderer/utils/make-signature";
import useInterval from "@renderer/utils/useInterval";
import { useQueryClient } from "@tanstack/react-query";

type SseEventName = "sse";

type SseEvent = {
  storeId: string;
  category: keyof SseCategory;
  action: keyof ServerAction;
  hasData: boolean;
  data: string | null;
};

type SseCategory = {
  DEVICE: "기기";
  STORE: "매장";
  CATEGORY: "카테고리";
  MENU: "메뉴";
  WAITING: "웨이팅";
  ORDER: "주문";
  STAFF_CALL: "직원 호출";
  RECEIPT: "레시피";
  POS: "POS";
};

type ServerAction = {
  GET: "조회";
  CREATE: "생성";
  UPDATE: "수정";
  DELETE: "삭제";
};

const SseContext = createContext(null);

const SseProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const { device } = useGetDevice();

  const eventSourceRef = useRef<EventSource<SseEventName> | null>(null);
  const isConnectedRef = useRef(false);
  const timestampRef = useRef("");

  useInterval(() => {
    timestampRef.current = Date.now().toString();
  }, 1000 * 30);

  useEffect(() => {
    if (!device || isConnectedRef.current) {
      return;
    }

    if (timestampRef.current === "") {
      timestampRef.current = Date.now().toString();
    }

    const connect = async () => {
      const deviceInfo = await window.storageAPI.getDeviceInfo();
      if (!deviceInfo || !deviceInfo.secretKey) {
        throw new Error("Device info not found");
      }

      const baseUrl = import.meta.env.DEV
        ? import.meta.env.VITE_API_BASE_URL_DEV
        : import.meta.env.VITE_API_BASE_URL_PROD;
      const requestURI = "/v1/stores/subscribe";
      const url = new URL(baseUrl + requestURI);

      eventSourceRef.current = new EventSource<SseEventName>(url, {
        headers: {
          "x-ew-access-key": {
            toString: () => device.deviceId,
          },
          "x-ew-signature": {
            toString: () =>
              makeSignature({
                method: "GET",
                uri: requestURI,
                deviceId: device.deviceId,
                secretKey: deviceInfo.secretKey,
                timestamp: timestampRef.current,
              }),
          },
          "x-ew-timestamp": {
            toString: () => timestampRef.current,
          },
        },
      });

      const listener: EventSourceListener<SseEventName> = (event) => {
        if (event.type === "open") {
          isConnectedRef.current = true;
        } else if (event.type === "close") {
          isConnectedRef.current = false;
        } else if (event.type === "sse") {
          if (!event.data || event.data === "CONNECTED!") {
            return;
          }

          const sseEvent: SseEvent = JSON.parse(event.data);
          switch (sseEvent.category) {
            case "DEVICE":
              if (
                sseEvent.data &&
                sseEvent.action !== "CREATE" &&
                sseEvent.data === device.deviceId
              ) {
                queryClient.invalidateQueries({ queryKey: [queryKey.DEVICE] });
              }
              break;
            case "STORE":
              queryClient.invalidateQueries({ queryKey: [queryKey.STORE] });
              break;
            case "CATEGORY":
              break;
            case "MENU":
              break;
            case "WAITING":
              queryClient.invalidateQueries({ queryKey: [queryKey.HALL, queryKey.WAITING] });
              break;
            case "ORDER":
              queryClient.invalidateQueries({ queryKey: [queryKey.HALL, queryKey.ORDER] });
              break;
            case "STAFF_CALL":
              queryClient.invalidateQueries({ queryKey: [queryKey.HALL, queryKey.STAFF_CALL] });
              break;
            case "RECEIPT":
            case "POS":
              break;
            default:
              throw new Error(`Unhandled store action event: ${sseEvent}`);
          }
        }
      };

      eventSourceRef.current.addEventListener("open", listener);
      eventSourceRef.current.addEventListener("close", listener);
      eventSourceRef.current.addEventListener("sse", listener);
    };

    connect();

    return () => {
      eventSourceRef.current?.removeAllEventListeners();
      eventSourceRef.current?.close();
      eventSourceRef.current = null;
      isConnectedRef.current = false;
    };
  }, [device, queryClient]);

  return <SseContext.Provider value={null}>{children}</SseContext.Provider>;
};

export default SseProvider;
