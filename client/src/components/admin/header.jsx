import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import PropTypes from "prop-types";

function AdminHeader({ setOpen }) {
  return (
    <header className="bg-slate-100 flex items-center justify-between px-4 py-3 border-b">
      {/* Toggle Button for Mobile */}
      <Button className="lg:hidden sm:block" onClick={() => setOpen(true)}>
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Logo */}
      <div className="hidden lg:flex flex-1 justify-start">LOGO</div>

      {/* Logout Button */}
      <div className="flex flex-1 justify-end">
        <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 font-medium shadow">
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}
AdminHeader.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default AdminHeader;
