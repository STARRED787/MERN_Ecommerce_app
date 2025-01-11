import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";

function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Admin Header */}
      <AdminHeader />

      {/* Sidebar and Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 bg-muted p-4 md:p-6">
          <h1>Content</h1>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
