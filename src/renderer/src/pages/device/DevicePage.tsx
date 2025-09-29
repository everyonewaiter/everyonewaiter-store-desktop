import { useState } from "react";
import DeviceStep1Comp from "@renderer/pages/device/components/DeviceStep1Comp";
import DeviceStep2Comp from "@renderer/pages/device/components/DeviceStep2Comp";
import Layout from "@renderer/pages/device/DeviceLayout";

function Page() {
  const [next, setNext] = useState(false);

  return (
    <Layout>
      {next ? <DeviceStep2Comp /> : <DeviceStep1Comp onNextStep={() => setNext(true)} />}
    </Layout>
  );
}

export default Page;
