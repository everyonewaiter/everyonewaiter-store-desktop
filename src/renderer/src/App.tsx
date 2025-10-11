import { HashRouter, Route, Routes } from "react-router-dom";
import DevicePage from "@renderer/pages/device/DevicePage";
import HallPage from "@renderer/pages/hall/HallPage";
import WaitingPage from "@renderer/pages/waiting/WaitingPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DevicePage />} />
        <Route path="/hall" element={<HallPage />} />
        <Route path="/waiting" element={<WaitingPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
