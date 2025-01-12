import { Button } from "@/components/ui/button";
import AddProductsForm from "@/components/admin/addproductsform"; // Import default directly
import AdminProductImageUpload from "@/components/admin/imageupload"; // Correct the name to uppercase
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Fragment, useState } from "react";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // Corrected state name

  function onSubmit() {
    // Your submit logic here
    console.log(formData);
  }

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
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Sheet
          open={openCreateProductDialog}
          onOpenChange={() => setOpenCreateProductDialog(false)}
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            {/* Corrected component name and prop names */}
            <AdminProductImageUpload
              imageFile={imageFile} // Ensure imageFile is passed correctly
              setImageFile={setImageFile} // Ensure setImageFile is passed correctly
              uploadedImageUrl={uploadedImageUrl} // Corrected prop name
              setUploadedImageUrl={setUploadedImageUrl} // Corrected prop name
            />
            <div className="py-6">
              <AddProductsForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                buttonText="Add"
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  );
}

export default AdminProducts;
