import { ChartNoAxesCombined } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();
  return (
    <Fragment>
      <aside className=" bg-slate-950 hidden flex-col w-64  border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin")}
          className=" cursor-pointer flex items-center gap-2 text-wh"
        >
          <ChartNoAxesCombined className="text-white" />
          <h1 className="text-white font-extrabold text-xl">Admin panel</h1>
        </div>
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
