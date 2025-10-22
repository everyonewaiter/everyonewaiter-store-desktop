import { HashRouter, Route, Routes } from "react-router-dom";
import DevicePage from "@renderer/pages/device/DevicePage";
import HallPage from "@renderer/pages/hall/HallPage";
import PosPaymentsPage from "@renderer/pages/pos/payments/PosPaymentsPage";
import PosPage from "@renderer/pages/pos/PosPage";
import PosTablesDetailPage from "@renderer/pages/pos/tables/[id]/PosTablesDetailPage";
import PosTablesPage from "@renderer/pages/pos/tables/PosTablesPage";
import WaitingPage from "@renderer/pages/waiting/WaitingPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DevicePage />} />
        <Route path="/hall" element={<HallPage />} />
        <Route path="/waiting" element={<WaitingPage />} />
        <Route path="/pos" element={<PosPage />} />
        <Route path="/pos/tables" element={<PosTablesPage />} />
        <Route path="/pos/payments" element={<PosPaymentsPage />} />
        <Route path="/pos/tables/:id" element={<PosTablesDetailPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
