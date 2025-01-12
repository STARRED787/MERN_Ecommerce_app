import { Button } from "@/components/ui/button";
import { Fragment } from "react";

function AdminProducts() {
  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button className="bg-orange-500">Add New Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols3 lg:grid-cols-4">
        title, description, category, brand, price, sale price, total
      </div>
    </Fragment>
  );
}

export default AdminProducts;
