import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";

function AdminHeader() {
  return (
    <header className=" bg-slate-100 flex items-center justify-between px-4 py-3 bg-background border border-b">
      <Button className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="hidden lg:flex flex-1 justify-start">LOGO</div>

      <div className=" flex flex-1 justify-end">
        <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 font-medium shadow ">
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
