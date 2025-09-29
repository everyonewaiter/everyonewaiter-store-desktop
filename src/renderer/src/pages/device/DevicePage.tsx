import { useState } from "react";
import DeviceLayout from "@renderer/components/layouts/DeviceLayout";
import FlowPage1 from "@renderer/pages/device/FlowPage1";
import FlowPage2 from "@renderer/pages/device/FlowPage2";

function DevicePage() {
  const [next, setNext] = useState(false);

  return (
    <DeviceLayout>
      {next ? <FlowPage2 /> : <FlowPage1 onNextStep={() => setNext(true)} />}
    </DeviceLayout>
  );
}

export default DevicePage;
