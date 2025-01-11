import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBasket,
  BadgeCent,
  ChartNoAxesCombined,
} from "lucide-react";

function AdminSidebar() {
  const navigate = useNavigate();

  // Menu items array
  const adminMenuBar = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icons: <LayoutDashboard />,
    },
    {
      id: "products",
      label: "Products",
      path: "/admin/products",
      icons: <ShoppingBasket />,
    },
    {
      id: "orders",
      label: "Orders",
      path: "/admin/orders",
      icons: <BadgeCent />,
    },
  ];

  return (
    <Fragment>
      <aside className="bg-slate-950 hidden flex-col w-64 border-r bg-background p-6 lg:flex">
        {/* Sidebar Header */}
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="cursor-pointer flex items-center gap-2 text-white"
        >
          <ChartNoAxesCombined className="text-white" />
          <h1 className="text-white font-extrabold text-xl">Admin Panel</h1>
        </div>

        {/* Sidebar Menu Items */}
        <nav className="mt-8 flex flex-col gap-2">
          {adminMenuBar.map((item) => (
            <div
              onClick={() => navigate(item.path)} // Navigate to the item's path
              key={item.id} // Unique key for each menu item
              className="text-muted-foreground flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-800 cursor-pointer"
            >
              {item.icons} {/* Display icon */}
              <span className="text-muted-foreground font-bold">
                {item.label}
              </span>{" "}
              {/* Display label */}
            </div>
          ))}
        </nav>
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
