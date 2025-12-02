import { HashRouter, Route, Routes } from "react-router-dom";
import DevicePage from "@renderer/pages/device/DevicePage";
import HallOrderPage from "@renderer/pages/hall/order/HallOrderPage";
import HallWaitingPage from "@renderer/pages/hall/waiting/HallWaitingPage";
import PosPaymentsPage from "@renderer/pages/pos/payments/PosPaymentsPage";
import PosPage from "@renderer/pages/pos/PosPage";
import PosTablesDetailPage from "@renderer/pages/pos/tables/[id]/PosTablesDetailPage";
import PosTablesPage from "@renderer/pages/pos/tables/PosTablesPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DevicePage />} />
        <Route path="/hall" element={<HallOrderPage />} />
        <Route path="/waiting" element={<HallWaitingPage />} />
        <Route path="/pos" element={<PosPage />} />
        <Route path="/pos/tables" element={<PosTablesPage />} />
        <Route path="/pos/payments" element={<PosPaymentsPage />} />
        <Route path="/pos/tables/:id" element={<PosTablesDetailPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
