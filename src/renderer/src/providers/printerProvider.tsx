import { createContext, PropsWithChildren, useContext, useEffect, useRef } from "react";
import { useGetDevice } from "@renderer/hooks/useGetDevice";
import { useGetStore } from "@renderer/hooks/useGetStore";
import { closePrinter, openUsbPrinter } from "@renderer/modules/printer";

interface PrinterContextValue {
  isConnectedRef: React.RefObject<boolean> | null;
  isReceiptPrinterLocationRef: React.RefObject<boolean> | null;
}

const PrinterContext = createContext<PrinterContextValue>({
  isConnectedRef: null,
  isReceiptPrinterLocationRef: null,
});

// eslint-disable-next-line react-refresh/only-export-components
export const usePrinter = () => {
  const context = useContext(PrinterContext);

  if (!context) {
    throw new Error("usePrinter must be used within an PrinterProvider");
  }

  return context;
};

const PrinterProvider = ({ children }: PropsWithChildren) => {
  const { device } = useGetDevice();
  const { store } = useGetStore(device?.storeId ?? "");

  const isConnectedRef = useRef(false);
  const isReceiptPrinterLocationRef = useRef(false);

  useEffect(() => {
    if (!device || !store) return;

    if (store.setting.printerLocation === "HALL" || device.purpose === "POS") {
      openUsbPrinter().then((result) => {
        if (result === 0) {
          isConnectedRef.current = true;
        }
      });
    }

    return () => {
      if (isConnectedRef.current) {
        closePrinter();
      }
    };
  }, [device, store]);

  useEffect(() => {
    if (!device || !store) return;

    if (store.setting.printerLocation === "HALL" && device.purpose === "HALL") {
      isReceiptPrinterLocationRef.current = true;
    }
    if (store.setting.printerLocation === "POS" && device.purpose === "POS") {
      isReceiptPrinterLocationRef.current = true;
    }
  }, [device, store]);

  return (
    <PrinterContext.Provider value={{ isConnectedRef, isReceiptPrinterLocationRef }}>
      {children}
    </PrinterContext.Provider>
  );
};

export default PrinterProvider;
