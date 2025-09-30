import { useState } from "react";
import DeviceLayout from "@renderer/pages/device/DeviceLayout";
import DeviceStep1Comp from "@renderer/pages/device/DeviceStep1Comp";
import DeviceStep2Comp from "@renderer/pages/device/DeviceStep2Comp";

function Page() {
  const [next, setNext] = useState(false);

  return (
    <DeviceLayout>
      {next ? <DeviceStep2Comp /> : <DeviceStep1Comp onNextStep={() => setNext(true)} />}
    </DeviceLayout>
  );
}

export default Page;
