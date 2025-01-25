import { HousePlug, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

function ShoppingHeader() {
  return (
    <header className="border-bottom sticky top-0 z-40 w-full bg-slate-900">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8 lg:px-16 xl:px-24 text-white">
        <Link className="flex items-center gap-2" to="/shop/home">
          {" "}
          <HousePlug className="h6 w-6" />
          <span className="font-bold">Ecommerce </span>
        </Link>
        <Sheet>
          <SheetTrigger>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden bg-border-500"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggale Header Menu</span>
            </Button>
            <SheetContent
              side="left"
              className="w-full max-w-xs"
            ></SheetContent>
          </SheetTrigger>
        </Sheet>
        <div className="hidden lg:block"></div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
