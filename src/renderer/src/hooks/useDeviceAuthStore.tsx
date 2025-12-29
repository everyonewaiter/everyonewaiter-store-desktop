import { create } from "zustand";

export type DeviceSubmitted = {
  phoneNumber: boolean;
  code: boolean;
  storeId: boolean;
};

interface DeviceAuthStoreState {
  isSubmitted: DeviceSubmitted;
  setIsSubmitted: (submitObj: Partial<DeviceSubmitted>) => void;
  resetSubmitted: (key?: keyof DeviceSubmitted) => void;
}

const useDeviceAuthStore = create<DeviceAuthStoreState>((set) => ({
  isSubmitted: {
    phoneNumber: false,
    code: false,
    storeId: false,
  },
  setIsSubmitted: (submitObj) =>
    set((state) => ({
      isSubmitted: { ...state.isSubmitted, ...submitObj },
    })),
  resetSubmitted: (key) => {
    if (key) {
      set((state) => ({ isSubmitted: { ...state.isSubmitted, [key]: false } }));
    } else {
      set({ isSubmitted: { phoneNumber: false, code: false, storeId: false } });
    }
  },
}));

export default useDeviceAuthStore;
