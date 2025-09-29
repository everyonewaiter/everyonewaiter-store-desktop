import { HashRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "@renderer/components/layouts/AuthLayout";
import DevicePage from "@renderer/pages/device/DevicePage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DevicePage />} />
        <Route element={<AuthLayout />}>{/* pos, hall, waiting pages */}</Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
