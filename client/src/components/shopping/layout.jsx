import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div className=" flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <ShoppingHeader />
      <main className="flex-1 flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;
