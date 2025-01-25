import { HousePlug, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { shopHeaderMenu } from "@/config";

// Generate menu items
function MenuItems() {
  return shopHeaderMenu.map((item) => (
    <Link
      key={item.id}
      to={item.path}
      className="block py-2 px-4 text-white hover:bg-slate-800 hover:rounded-sm hover:text-slate-500 font-bold"
    >
      {item.label}
    </Link>
  ));
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="border-b border-slate-700 sticky top-0 z-40 w-full bg-slate-900">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8 lg:px-16 xl:px-24 text-white">
        {/* Logo */}
        <Link className="flex items-center gap-2" to="/shop/home">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>

        {/* Mobile Menu - Sheet */}
        <Sheet>
          <SheetTrigger>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden bg-slate-800 hover:bg-slate-700"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-slate-900">
            <div className="flex flex-col h-full">
              <h2 className="text-lg font-bold text-white py-4 px-4">Menu</h2>
              <MenuItems />
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8">
          <MenuItems />
        </div>

        {/* Authentication Options */}
        <div className="hidden lg:block">
          {isAuthenticated ? (
            <Button className="text-white hover:bg-slate-700 ">Logout</Button>
          ) : (
            <Link to="/login">
              <Button className="text-white hover:bg-slate-700">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
