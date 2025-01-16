import { Button } from "@/components/ui/button"; // UI Button for user interaction
import AddProductsForm from "@/components/admin/addproductsform"; // Form component for adding product details
import AdminProductImageUpload from "@/components/admin/imageupload"; // Image upload component
import {
  Sheet, // Main sliding panel component
  SheetContent, // Content area of the panel
  SheetHeader, // Header section of the panel
  SheetTitle, // Title in the panel header
} from "@/components/ui/sheet";
import { Fragment, useState } from "react"; // React hooks and wrapper component

// Initial form data structure
const initialFormData = {
  image: null, // To store the uploaded image
  title: "", // Product title
  description: "", // Product description
  category: "", // Product category
  brand: "", // Product brand
  price: "", // Product price
  salePrice: "", // Discounted price
  totalStock: "", // Total available stock
};

function AdminProducts() {
  // State to manage the visibility of the "Add Product" sliding panel
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);

  // State for managing form data
  const [formData, setFormData] = useState(initialFormData);

  // State for handling uploaded image file
  const [imageFile, setImageFile] = useState(null);

  // State for storing the URL of the uploaded image
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  // State to track the image loading state
  const [imageLoadingState, setImageLoadingState] = useState(false); // Changed to boolean

  // Function to handle form submission
  function onSubmit() {
    console.log(formData); // Logs the form data to the console
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

            {/* Image upload component */}
            <AdminProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState} // Pass function
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
