import { Label } from "@radix-ui/react-label"; // For accessible labels
import { useEffect, useRef } from "react"; // React hooks for state management and references
import { Input } from "../ui/input"; // Custom Input component
import PropTypes from "prop-types"; // Prop types for runtime validation
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react"; // Icons for UI
import { Button } from "../ui/button"; // Custom Button component
import axios from "axios"; // Library for making HTTP requests
import { Skeleton } from "../ui/skeleton";

// AdminProductImageUpload component
function AdminProductImageUpload({
  imageFile, // Current selected image file
  setImageFile, // Function to update the image file state
  uploadedImageUrl, // URL of the uploaded image
  imageLoadingState, // Loading state for image upload
  setUploadedImageUrl, // Function to update the uploaded image URL
  setImageLoadingState, // Function to manage the loading state
}) {
  const inputRef = useRef(null); // Reference to the file input element

  // Handle file selection when a user selects a file via the file input
  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0]; // Get the selected file
    if (selectedFile) {
      setImageFile(selectedFile); // Update the selected image file state
      setUploadedImageUrl(URL.createObjectURL(selectedFile)); // Generate a local preview URL for the file
    }
  }

  // Handle drag-over event to allow file dropping
  function handleDragOver(event) {
    event.preventDefault(); // Prevent default behavior to enable dropping
  }

  // Handle drop event when a file is dropped into the drop area
  function handleDrop(event) {
    event.preventDefault(); // Prevent default behavior
    const droppedFile = event.dataTransfer.files?.[0]; // Get the dropped file
    if (droppedFile) {
      setImageFile(droppedFile); // Update the selected image file state
      setUploadedImageUrl(URL.createObjectURL(droppedFile)); // Generate a local preview URL for the dropped file
    }
  }

  // Handle the removal of the currently selected image
  function handleRemoveImage() {
    setImageFile(null); // Clear the selected image file state
    setUploadedImageUrl(""); // Clear the uploaded image preview
    if (inputRef.current) {
      inputRef.current.value = ""; // Reset the file input element
    }
  }

  // Upload the image to Cloudinary or your backend
  async function uploadImageToCloudinary() {
    if (!imageFile) return; // Return early if no file is selected

    const data = new FormData(); // Create a new FormData object
    data.append("image", imageFile); // Append the image file to the form data

    try {
      setImageLoadingState(true); // Set loading state to true
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image", // API endpoint for image upload
        data // Form data containing the image file
      );

      if (response.data?.success) {
        setUploadedImageUrl(response.data.result.url); // Update the uploaded image URL state with the response
        console.log(response.data); // Log the response for debugging
      }
    } catch (error) {
      console.error("Image upload failed:", error); // Log errors if the upload fails
    } finally {
      setImageLoadingState(false); // Set loading state to false
    }
  }

  // Automatically upload the image whenever the `imageFile` changes
  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary(); // Trigger the upload when the file changes
    }
  }, [imageFile]); // Dependency array ensures this effect runs when `imageFile` changes

  return (
    <div className="w-full max-w-md mx-auto">
      {" "}
      {/* Center the container */}
      <Label className="text-lg font-semibold mb-2 block">Upload</Label>{" "}
      {/* Label for the upload section */}
      <div
        onDragOver={handleDragOver} // Allow drag-over behavior
        onDrop={handleDrop} // Handle file drop
        className="border-2 border-dashed rounded-lg p-4 cursor-pointer" // Styling for the drop area
      >
        {/* File input (hidden) */}
        <Input
          type="file"
          id="imageUpload" // Input element ID
          ref={inputRef} // Reference for resetting the input
          onChange={handleImageFileChange} // Handle file selection
          className="hidden" // Hide the input visually
        />

        {/* Conditionally render content based on whether an image file is selected */}
        {!imageFile ? (
          <Label
            htmlFor="imageUpload" // Associate label with the input
            className="flex flex-col items-center justify-center h-32"
          >
            <UploadCloudIcon size={32} className="text-muted-foreground mb-2" />{" "}
            {/* Upload icon */}
            <span>Drag & drop or click to upload image</span>{" "}
            {/* Instructional text */}
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className=" h-10 bg-gray-300" />
        ) : (
          <div className="flex items-center justify-between">
            {" "}
            {/* Preview section */}
            <div className="flex items-center">
              <FileIcon size={32} className="text-muted-foreground mr-2 h-8" />{" "}
              {/* File icon */}
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>{" "}
            {/* File name */}
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage} // Remove the selected file
            >
              <XIcon className="w-4 h-4" /> {/* Close icon */}
              <span className="sr-only">Remove File</span>{" "}
              {/* Screen reader text */}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// PropTypes validation
AdminProductImageUpload.propTypes = {
  imageFile: PropTypes.object, // The selected image file
  setImageFile: PropTypes.func.isRequired, // Function to update the image file state
  uploadedImageUrl: PropTypes.string, // URL of the uploaded image
  setUploadedImageUrl: PropTypes.func.isRequired, // Function to update the uploaded image URL
  setImageLoadingState: PropTypes.func.isRequired, // Function to manage the loading state
  imageLoadingState: PropTypes.bool.isRequired, // Loading state for image upload
};

export default AdminProductImageUpload; // Export the component
