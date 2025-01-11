import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";

function AdminHeader() {
  return (
    <header className=" flex items-center justify-between px-4 py-3 bg-background border border-b">
      <Button>
        <AlignJustify />
        <span>Toggle</span>
      </Button>
    </header>
  );
}

export default AdminHeader;
