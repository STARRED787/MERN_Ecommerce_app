import { ChartNoAxesCombined } from "lucide-react";
import { Fragment } from "react";

function AdminSidebar() {
  return (
    <Fragment className="">
      <aside className=" bg-slate-950 hidden flex-col w-64 border-r bg-background p-6 lg:flex">
        <div className="flex items-center gap-2 text-white">
          <ChartNoAxesCombined />
          <h1 className="text-xl font-extrabold">Admin panel</h1>
        </div>
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
