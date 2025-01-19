// Importing necessary components, hooks, and actions
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
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state and dispatching actions
import {
  addNewProduct, // Action to add a new product
  deleteProduct, // Action to delete a product
  editProduct, // Action to edit a product
  fetchProduct, // Action to fetch all products
} from "@/store/admin/product-slice";
import { toast } from "react-toastify"; // Toast notifications for user feedback
import AdminViewProduct from "@/components/admin/viewProduct"; // Component to display individual products

// Initial form data structure for product details
const initialFormData = {
  image: null, // Placeholder for the uploaded image
  title: "", // Title of the product
  description: "", // Description of the product
  category: "", // Product category
  brand: "", // Brand of the product
  price: "", // Price of the product
  salePrice: "", // Discounted sale price
  totalStock: "", // Total available stock
};

// Main component to manage product administration
function AdminProducts() {
  // State to control the visibility of the "Add Product" sliding panel
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);

  // State to manage the form data for adding or editing a product
  const [formData, setFormData] = useState(initialFormData);

  // State to handle the uploaded image file (raw file object)
  const [imageFile, setImageFile] = useState(null);

  // State to store the URL of the uploaded image (for preview purposes)
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  // State to indicate whether the image upload is in progress
  const [imageLoadingState, setImageLoadingState] = useState(false);

  // Extract the product list from the Redux store
  const { productList } = useSelector((state) => state.adminProduct);

  // State to keep track of the currently edited product ID
  const [currentEditedId, setCurrentEditedId] = useState(null);

  // Redux dispatch function to trigger actions
  const dispatch = useDispatch();

  // Function to handle form submission for adding or editing products
  function onSubmit() {
    if (currentEditedId !== null) {
      // If a product is being edited
      dispatch(
        editProduct({
          id: currentEditedId, // Pass the product ID
          formData, // Pass the updated form data
        })
      ).then((data) => {
        if (data?.payload?.success) {
          // Fetch updated product list after editing
          dispatch(fetchProduct());
          // Reset form and state
          setFormData(initialFormData);
          toast.success("Product updated successfully");
          setOpenCreateProductDialog(false); // Close the sliding panel
          setCurrentEditedId(null); // Reset current edited ID
        }
      });
    } else {
      // If a new product is being added
      dispatch(
        addNewProduct({
          ...formData, // Pass the form data
          image: uploadedImageUrl, // Include the uploaded image URL
        })
      ).then((data) => {
        if (data?.payload?.success) {
          // Fetch updated product list after adding
          dispatch(fetchProduct());
          // Reset form, state, and notifications
          setImageFile(null);
          setFormData(initialFormData);
          toast.success("Product added successfully");
          setOpenCreateProductDialog(false); // Close the sliding panel
        }
      });
    }
  }

  // Function to validate the form data before submission
  function isFormValid() {
    return Object.keys(formData) // Get all keys of the form data
      .map((key) => formData[key] !== "") // Check if each value is not empty
      .every((item) => item); // Ensure all fields are valid
  }

  // Function to handle product deletion
  function handleDeleteProduct(getCurrentProductId) {
    console.log("Deleting product ID:", getCurrentProductId); // Debugging purpose

    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      console.log("Delete response:", data); // Debugging purpose
      if (data?.payload?.success) {
        dispatch(fetchProduct()); // Fetch updated product list
        toast.success("Product deleted successfully"); // Show success notification
      }
    });
  }

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]); // Dependency array ensures this runs only when `dispatch` changes

  console.log(productList); // Debugging purpose to check the product list

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

      {/* Grid layout for displaying products */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminViewProduct
                setOpenCreateProductDialog={setOpenCreateProductDialog} // To open the sliding panel for editing
                setFormData={setFormData} // To populate the form with product details
                setCurrentEditedId={setCurrentEditedId} // To track the edited product ID
                key={productItem.id} // Unique key for each product
                product={productItem} // Pass product details
                handleDeleteProduct={handleDeleteProduct} // Handle product deletion
              />
            ))
          : null}
      </div>

      {/* Sliding panel for Add/Edit Product */}
      <Sheet
        open={openCreateProductDialog} // Control panel visibility
        onOpenChange={() => {
          setOpenCreateProductDialog(false); // Close the panel
          setCurrentEditedId(null); // Reset the edited product ID
          setFormData(initialFormData); // Reset the form
        }}
      >
        {/* Panel content */}
        <SheetContent side="right" className="overflow-auto">
          {/* Panel header */}
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add Product"}{" "}
              {/* Dynamic title */}
            </SheetTitle>
          </SheetHeader>

          {/* Image upload component */}
          <AdminProductImageUpload
            imageFile={imageFile} // Current image file
            setImageFile={setImageFile} // Update image file state
            uploadedImageUrl={uploadedImageUrl} // URL of the uploaded image
            setUploadedImageUrl={setUploadedImageUrl} // Update image URL state
            setImageLoadingState={setImageLoadingState} // Set loading state
            imageLoadingState={imageLoadingState} // Current loading state
            isEditMode={currentEditedId !== null} // Check if in edit mode
          />

          {/* Product form */}
          <div className="py-6">
            <AddProductsForm
              formData={formData} // Form data for product
              setFormData={setFormData} // Update form data state
              onSubmit={onSubmit} // Handle form submission
              buttonText={currentEditedId !== null ? "Update" : "Add"} // Dynamic button text
              isButtonDisabled={!isFormValid()} // Disable button if form is invalid
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts; // Export the AdminProducts component
