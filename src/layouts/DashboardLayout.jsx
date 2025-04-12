import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import GeminiAssistant from '../components/dashboard/GeminiAssistant';

export default function DashboardLayout() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-start p-4">
        {/* Drawer Toggle Button for mobile */}
        <label htmlFor="sidebar-drawer" className="btn btn-primary drawer-button lg:hidden mb-4 self-start">
          ☰
        </label>

        {/* Page Content in the center */}
        <div className="w-full max-w-5xl">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <Sidebar />
      </div>
      <GeminiAssistant />
    </div>
  );
}