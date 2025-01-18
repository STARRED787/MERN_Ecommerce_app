import { Button } from "@/components/ui/button"; // UI Button for user interaction
import AddProductsForm from "@/components/admin/addproductsform"; // Form component for adding product details
import AdminProductImageUpload from "@/components/admin/imageupload"; // Image upload component
import {
  Sheet, // Main sliding panel component
  SheetContent, // Content area of the panel
  SheetHeader, // Header section of the panel
  SheetTitle, // Title in the panel header
} from "@/components/ui/sheet";
import { Fragment, useEffect, useState } from "react"; // React hooks for state management and Fragment as a wrapper component
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, fetchProduct } from "@/store/admin/product-slice";
import { toast } from "react-toastify";

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

// Main AdminProducts component
function AdminProducts() {
  // State to manage the visibility of the "Add Product" sliding panel
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);

  // State for managing form data (used to capture product details)
  const [formData, setFormData] = useState(initialFormData);

  // State for handling the uploaded image file (raw file object)
  const [imageFile, setImageFile] = useState(null);

  // State for storing the URL of the uploaded image (used for preview purposes)
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  // State to track whether the image is being uploaded
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const { productList } = useSelector((state) => state.adminProduct); // Extract the productList from the state
  const dispatch = useDispatch(); // Dispatch function to call actions

  // Function to handle form submission
  function onSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageUrl,
      })
    ).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        dispatch(fetchProduct());
        setImageFile(null);
        setFormData(initialFormData);
        toast.success("Product added successfully");
        setOpenCreateProductDialog(false);
      }
    });
  }

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);
  console.log(productList); // Log the form data to the console (to be replaced with API call)
  return (
    <Fragment>
      <adminViewProduct />
      {/* Add New Product Button */}
      <div className="mb-5 w-full flex justify-end">
        <Button
          onClick={() => setOpenCreateProductDialog(true)} // Open the sliding panel
          className="bg-orange-500 hover:bg-orange-400" // Button styles
        >
          Add New Product
        </Button>
      </div>

      {/* Grid layout for displaying components */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* Sliding panel component */}
        <Sheet
          open={openCreateProductDialog} // Manage panel visibility
          onOpenChange={() => setOpenCreateProductDialog(false)} // Close panel on change
        >
          {/* Panel content */}
          <SheetContent side="right" className="overflow-auto">
            {/* Panel header */}
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>{" "}
              {/* Title in the panel */}
            </SheetHeader>

            {/* Image upload component */}
            <AdminProductImageUpload
              imageFile={imageFile} // Current selected image file
              setImageFile={setImageFile} // Function to update image file state
              uploadedImageUrl={uploadedImageUrl} // URL of the uploaded image
              setUploadedImageUrl={setUploadedImageUrl} // Function to update uploaded image URL
              setImageLoadingState={setImageLoadingState} // Function to set the loading state
              imageLoadingState={imageLoadingState} // Loading state of the image
            />

            {/* Form component for product details */}
            <div className="py-6">
              <AddProductsForm
                formData={formData} // Current form data (product details)
                setFormData={setFormData} // Function to update form data state
                onSubmit={onSubmit} // Submit function for the form
                buttonText="Add" // Text for the submit button
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  );
}

export default AdminProducts; // Export the AdminProducts component
