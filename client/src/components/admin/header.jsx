import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";

function AdminHeader() {
  return (
    <header className=" flex items-center justify-between px-4 py-3 bg-background border border-b">
      <Button className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className=" flex flex-1 justify-end">
        <Button>
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
