import { Fragment } from "react";

function AdminSidebar() {
  return (
    <Fragment>
      <aside className="hidden flex-col w-64 border-r bg-background p-6 lg:flex">
        <div className="flex items-center gap-2"></div>
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
