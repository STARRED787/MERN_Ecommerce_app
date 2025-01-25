import { HousePlug, Menu, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { shopHeaderMenu } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenuItem, DropdownMenuLabel } from "../ui/dropdown-menu";

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

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      {/* Cart Button */}
      <Button variant="outline" className="bg-slate-800 hover:bg-slate-700">
        <ShoppingCart className="h-5 w-5" />
        <span className="sr-only">User Cart</span>
      </Button>

      {/* User Avatar with Dropdown Menu */}
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black cursor-pointer">
              <AvatarFallback className="bg-black text-white font-extrabold">
                {user.username[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className=" w-21 bg-slate-900">
            <DropdownMenuLabel className="text-gray-400">
              Logged{" "}
              <span className="font-bold text-white">{user.username}</span>
            </DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link to="/profile" className="hover:text-white">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="hover:text-white">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button
                onClick={() => {
                  // Add logout logic here
                  console.log("Logout clicked");
                }}
                className="hover:text-red-500 w-full"
              >
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/login">
          <Button variant="outline" className="bg-slate-800 hover:bg-slate-700">
            Login
          </Button>
        </Link>
      )}
    </div>
  );
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
        <div className="hidden lg:flex gap-2">
          <MenuItems />
        </div>

        {/* Authentication Options */}
        <div className="hidden lg:block">
          {isAuthenticated ? (
            <div>
              <HeaderRightContent />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
