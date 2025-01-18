// Import necessary components and hooks
import { Button } from "@/components/ui/button"; // UI Button for user interaction
import AddProductsForm from "@/components/admin/addproductsform"; // Form component for adding product details
import AdminProductImageUpload from "@/components/admin/imageupload"; // Image upload component
import {
  Sheet, // Main sliding panel component (like a drawer)
  SheetContent, // Content area inside the sliding panel
  SheetHeader, // Header section of the sliding panel
  SheetTitle, // Title of the sliding panel
} from "@/components/ui/sheet";
import { Fragment, useEffect, useState } from "react"; // React hooks for state management and Fragment as a wrapper component
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management
import { addNewProduct, fetchProduct } from "@/store/admin/product-slice"; // Redux actions for managing products
import { toast } from "react-toastify"; // Library for showing notifications
import AdminViewProduct from "@/components/admin/viewProduct"; // Component to display individual product details

// Define the initial structure of the form data (product details)
const initialFormData = {
  image: null, // To store the uploaded image file
  title: "", // Product title (text input)
  description: "", // Product description (text area)
  category: "", // Product category (dropdown or text input)
  brand: "", // Product brand (text input)
  price: "", // Product price (number input)
  salePrice: "", // Discounted price (number input)
  totalStock: "", // Total available stock (number input)
};

// Main component for managing admin product-related functionality
function AdminProducts() {
  // State to manage the visibility of the sliding panel (Add Product form)
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);

  // State for storing the current form data (product details)
  const [formData, setFormData] = useState(initialFormData);

  // State for managing the raw file of the uploaded image
  const [imageFile, setImageFile] = useState(null);

  // State for storing the URL of the uploaded image (used for preview purposes)
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  // State to indicate whether the image is being uploaded (loading state)
  const [imageLoadingState, setImageLoadingState] = useState(false);

  // Extract the product list from the Redux store's state
  const { productList } = useSelector((state) => state.adminProduct);

  // Redux dispatch function to call actions
  const dispatch = useDispatch();

  // Function to handle form submission (called when the form is submitted)
  function onSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior (page reload)

    // Dispatch the `addNewProduct` action with the form data (including uploaded image URL)
    dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageUrl, // Include the image URL in the form data
      })
    ).then((data) => {
      console.log(data); // Log the response for debugging

      // Check if the product was added successfully
      if (data?.payload?.success) {
        dispatch(fetchProduct()); // Refresh the product list
        setImageFile(null); // Reset the uploaded image file
        setFormData(initialFormData); // Reset the form data
        toast.success("Product added successfully"); // Show success notification
        setOpenCreateProductDialog(false); // Close the sliding panel
      }
    });
  }

  // Fetch the list of products when the component is mounted
  useEffect(() => {
    dispatch(fetchProduct()); // Dispatch the `fetchProduct` action to load products
  }, [dispatch]); // Dependency array ensures this runs only once (or when `dispatch` changes)

  // Log the product list for debugging purposes
  console.log(productList);

  // Render the component
  return (
    <Fragment>
      {/* Button to open the "Add New Product" sliding panel */}
      <div className="mb-5 w-full flex justify-end">
        <Button
          onClick={() => setOpenCreateProductDialog(true)} // Open the panel when clicked
          className="bg-orange-500 hover:bg-orange-400" // Button styling
        >
          Add New Product
        </Button>
      </div>

      {/* Grid layout to display the list of products */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* Check if there are products to display */}
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminViewProduct key={productItem.id} product={productItem} />
            ))
          : null}
      </div>

      {/* Sliding panel for adding a new product */}
      <Sheet
        open={openCreateProductDialog} // Controls whether the panel is open
        onOpenChange={() => setOpenCreateProductDialog(false)} // Close the panel when needed
      >
        <SheetContent side="right" className="overflow-auto">
          {/* Panel header */}
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle> {/* Panel title */}
          </SheetHeader>

          {/* Image upload component */}
          <AdminProductImageUpload
            imageFile={imageFile} // Current selected image file
            setImageFile={setImageFile} // Function to update the image file
            uploadedImageUrl={uploadedImageUrl} // URL of the uploaded image
            setUploadedImageUrl={setUploadedImageUrl} // Function to update the uploaded image URL
            setImageLoadingState={setImageLoadingState} // Function to update loading state
            imageLoadingState={imageLoadingState} // Current loading state
          />

          {/* Form for entering product details */}
          <div className="py-6">
            <AddProductsForm
              formData={formData} // Current form data
              setFormData={setFormData} // Function to update the form data
              onSubmit={onSubmit} // Form submission handler
              buttonText="Add" // Text on the submit button
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

// Export the component as default for use in other parts of the application
export default AdminProducts;
