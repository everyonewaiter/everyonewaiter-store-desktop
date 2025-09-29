import { HashRouter, Route, Routes } from "react-router-dom";
import DevicePage from "@renderer/pages/device/DevicePage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DevicePage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
