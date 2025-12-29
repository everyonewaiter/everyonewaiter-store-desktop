import useDeviceStore from "@renderer/hooks/useDeviceStore";
import DeviceLayout from "@renderer/pages/device/DeviceLayout";
import DeviceStep1Comp from "@renderer/pages/device/DeviceStep1Comp";
import DeviceStep2Comp from "@renderer/pages/device/DeviceStep2Comp";

function Page() {
  const step = useDeviceStore((state) => state.step);

  return <DeviceLayout>{step === 1 ? <DeviceStep1Comp /> : <DeviceStep2Comp />}</DeviceLayout>;
}

export default Page;
