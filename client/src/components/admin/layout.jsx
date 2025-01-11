import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";

function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Sidebar and Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Admin Header */}
        <AdminHeader />

        {/* Main Content */}
        <main className="flex-1 bg-muted p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
