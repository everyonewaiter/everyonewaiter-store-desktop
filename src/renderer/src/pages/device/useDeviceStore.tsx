import { deviceSchema } from "@renderer/schemas/device";
import z from "zod";
import { create } from "zustand";

type DeviceSchemaType = z.infer<typeof deviceSchema>;

export interface DeviceStoreState {
  step: number;
  nextStep: () => void;
  deviceData: DeviceSchemaType | null;
  setDeviceData: (data: Partial<DeviceSchemaType>) => void;
  resetDeviceData: () => void;
}

const useDeviceStore = create<DeviceStoreState>((set) => ({
  step: 1,
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  deviceData: null,
  setDeviceData: (data) =>
    set((state) => ({ deviceData: { ...state.deviceData, ...data } as DeviceSchemaType })),
  resetDeviceData: () => set({ deviceData: null }),
}));

export default useDeviceStore;
