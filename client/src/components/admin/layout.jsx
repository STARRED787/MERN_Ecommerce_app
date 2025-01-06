import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";

function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Admin Sidebar */}
      <AdminSidebar />
      <div className="flex flex-1 flex-col">{/* Admin Header */}</div>
      {/* Admin header */}
      <AdminHeader />
      <main className="flex-1 flex bg-muted p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
