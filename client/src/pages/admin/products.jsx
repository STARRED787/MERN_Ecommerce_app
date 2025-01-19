import { Button } from "@/components/ui/button"; // UI Button for user interaction
import AddProductsForm from "@/components/admin/addproducts"; // Form component for adding product details
import AdminProductImageUpload from "@/components/admin/imageupload"; // Image upload component
import {
  Sheet, // Main sliding panel component
  SheetContent, // Content area of the panel
  SheetHeader, // Header section of the panel
  SheetTitle, // Title in the panel header
} from "@/components/ui/sheet";
import { Fragment, useEffect, useState } from "react"; // React hooks for state management and Fragment as a wrapper component
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  editProduct,
  fetchProduct,
} from "@/store/admin/product-slice";
import { toast } from "react-toastify";
import AdminViewProduct from "@/components/admin/viewProduct";
import { data } from "react-router-dom";

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

  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch(); // Dispatch function to call actions

  // Function to handle form submission
  function onSubmit() {
    if (currentEditedId !== null) {
      // Edit Product
      dispatch(
        editProduct({
          id: currentEditedId,
          formData, // Use the state directly
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchProduct());
          setFormData(initialFormData);
          toast.success("Product updated successfully");
          setOpenCreateProductDialog(false);
          setCurrentEditedId(null);
        }
      });
    } else {
      // Add New Product
      dispatch(
        addNewProduct({
          ...formData, // Pass the form values
          image: uploadedImageUrl, // Include image URL
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchProduct());
          setImageFile(null);
          setFormData(initialFormData);
          toast.success("Product added successfully");
          setOpenCreateProductDialog(false);
        }
      });
    }
  }

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);
  console.log(productList); // Log the form data to the console (to be replaced with API call)
  return (
    <Fragment>
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
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminViewProduct
                setOpenCreateProductDialog={setOpenCreateProductDialog}
                setFormData={setFormData}
                setCurrentEditedId={setCurrentEditedId}
                key={productItem.id}
                product={productItem}
              />
            ))
          : null}
      </div>
      {/* Sliding panel component */}
      <Sheet
        open={openCreateProductDialog} // Manage panel visibility
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }} // Close panel on change
      >
        {/* Panel content */}
        <SheetContent side="right" className="overflow-auto">
          {/* Panel header */}
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add Product"}
            </SheetTitle>{" "}
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
            isEditMode={currentEditedId !== null} // Check if the image is being edited
          />

          {/* Form component for product details */}
          <div className="py-6">
            <AddProductsForm
              formData={formData} // Current form data (product details)
              setFormData={setFormData} // Function to update form data state
              onSubmit={onSubmit} // Submit function for the form
              buttonText={currentEditedId !== null ? "Update" : "Add"} // Text for the submit button
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts; // Export the AdminProducts component
