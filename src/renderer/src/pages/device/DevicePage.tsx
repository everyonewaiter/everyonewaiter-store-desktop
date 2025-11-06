import { useState } from "react";
import DeviceLayout from "@renderer/pages/device/DeviceLayout";
import DeviceStep1Comp from "@renderer/pages/device/DeviceStep1Comp";
import DeviceStep2Comp from "@renderer/pages/device/DeviceStep2Comp";

function Page() {
  // TODO: 단계별 상태관리(인증 정보 포함) -> Zustand
  const [next, setNext] = useState(false);
  // const [deviceData, setDeviceData] = useState<DeviceSchema | null>(null);

  return (
    <DeviceLayout>
      {next ? (
        <DeviceStep2Comp /* deviceData={deviceData} */ />
      ) : (
        <DeviceStep1Comp
          onNextStep={() => {
            // setDeviceData(data);
            setNext(true);
          }}
        />
      )}
    </DeviceLayout>
  );
}

export default Page;
