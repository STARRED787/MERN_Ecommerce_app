import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Admin Sidebar */}
      <div className="flex flex-1 flex-col">{/* Admin Header */}</div>
      {/* Admin header */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
