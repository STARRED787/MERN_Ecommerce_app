import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";

function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Admin Header */}
      <AdminHeader />

      {/* Admin Sidebar */}
      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 bg-muted p-4 md:p-6">
          <h1>content</h1>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
