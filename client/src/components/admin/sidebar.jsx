import { Fragment } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBasket,
  BadgeCent,
  ChartNoAxesCombined,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

function AdminSidebar({ open, setOpen }) {
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
      {/* Mobile Sidebar with Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 bg-slate-950 text-white">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b border-gray-700 pb-4">
              <div className="flex items-center gap-2">
                <ChartNoAxesCombined className="text-white" />
                <SheetTitle
                  onClick={() => {
                    navigate("/admin/dashboard");
                  }}
                  className="text-white font-extrabold text-xl cursor-pointer"
                >
                  Admin Panel
                </SheetTitle>
              </div>
            </SheetHeader>

            <nav className="mt-8 flex flex-col gap-2">
              {adminMenuBar.map((item) => (
                <div
                  onClick={() => {
                    navigate(item.path);
                    setOpen(false); // Close the sheet after navigation
                  }}
                  key={item.id}
                  className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-800 cursor-pointer"
                >
                  {item.icons}
                  <span className="font-bold">{item.label}</span>
                </div>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r p-6 h-screen ">
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
              onClick={() => navigate(item.path)}
              key={item.id}
              className="text-muted-foreground flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-800 cursor-pointer "
            >
              {item.icons}
              <span className="text-muted-foreground font-bold">
                {item.label}
              </span>
            </div>
          ))}
        </nav>
      </aside>
    </Fragment>
  );
}
AdminSidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default AdminSidebar;
