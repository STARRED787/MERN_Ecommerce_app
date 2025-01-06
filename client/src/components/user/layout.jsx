import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <div className=" flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <main className="flex-1 flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default UserLayout;
