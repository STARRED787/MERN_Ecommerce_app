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

  // Function to handle form submission
  function onSubmit() {
    // Your submit logic here
    console.log(formData); // Logs the form data to the console
  }

  return (
    <Fragment>
      {/* Button to open the "Add New Product" sliding panel */}
      <div className="mb-5 w-full flex justify-end">
        <Button
          onClick={() => setOpenCreateProductDialog(true)} // Opens the sliding panel
          className="bg-orange-500 hover:bg-orange-400" // Styling for the button
        >
          Add New Product
        </Button>
      </div>

      {/* Grid layout for displaying the panel and other components */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* Sliding panel (Sheet) */}
        <Sheet
          open={openCreateProductDialog} // Controls whether the panel is open
          onOpenChange={() => setOpenCreateProductDialog(false)} // Closes the panel
        >
          {/* Panel content */}
          <SheetContent side="right" className="overflow-auto">
            {/* Panel header */}
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle> {/* Panel title */}
            </SheetHeader>

            {/* Image upload component */}
            <AdminProductImageUpload
              imageFile={imageFile} // Passes the image file state
              setImageFile={setImageFile} // Allows updating the image file state
              uploadedImageUrl={uploadedImageUrl} // Passes the uploaded image URL state
              setUploadedImageUrl={setUploadedImageUrl} // Allows updating the image URL state
            />

            {/* Product form */}
            <div className="py-6">
              <AddProductsForm
                formData={formData} // Passes the form data state
                setFormData={setFormData} // Allows updating the form data state
                onSubmit={onSubmit} // Handles the form submission
                buttonText="Add" // Button text for the form submission
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  );
}

export default AdminProducts; // Exports the component for use in other parts of the application
