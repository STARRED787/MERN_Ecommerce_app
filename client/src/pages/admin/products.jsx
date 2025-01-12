import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Fragment, useState } from "react";

function AdminProducts() {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button
          onClick={() => setOpenCreateProductDialog(true)}
          className="bg-orange-500 hover:bg-orange-400"
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols3 lg:grid-cols-4">
        <Sheet
          open={openCreateProductDialog}
          onOpenChange={() => setOpenCreateProductDialog(false)}
        >
          <SheetContent side="right" className="overflow-auto"></SheetContent>
        </Sheet>
      </div>
    </Fragment>
  );
}

export default AdminProducts;
