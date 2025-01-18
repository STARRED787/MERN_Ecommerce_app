import { useEffect, useRef, useState } from "react"; // React hooks for state management and references
import PropTypes from "prop-types"; // Prop types for runtime validation
import { Label } from "@radix-ui/react-label"; // For accessible labels
import { Input } from "../ui/input"; // Custom Input component
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react"; // Icons for UI
import { Button } from "../ui/button"; // Custom Button component
import { Skeleton } from "../ui/skeleton";
import axios from "axios";

// AdminProductImageUpload component
function AdminProductImageUpload({
  imageFile, // Current selected image file
  setImageFile, // Function to update the image file state
  imageLoadingState, // Loading state for image upload
  setImageLoadingState, // Function to manage the loading state
  setUploadedImageUrl, // Function to update the uploaded image URL
}) {
  const inputRef = useRef(null); // Reference to the file input element
  const [validationError, setValidationError] = useState(""); // State to hold validation errors

  // File size limit in bytes (e.g., 5 MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  // Allowed file types
  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

  // Handle file selection when a user selects a file via the file input
  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0]; // Get the selected file
    if (selectedFile) {
      validateFile(selectedFile); // Validate the selected file
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
      validateFile(droppedFile); // Validate the dropped file
    }
  }

  // Validate the selected file
  function validateFile(file) {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setValidationError(
        "Invalid file type. Only JPEG, PNG, and GIF are allowed."
      );
      setImageFile(null); // Clear the file input
      setUploadedImageUrl(""); // Clear the image preview
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setValidationError("File is too large. Maximum size is 5MB.");
      setImageFile(null); // Clear the file input
      setUploadedImageUrl(""); // Clear the image preview
      return;
    }

    // If the file is valid, update state and clear any previous errors
    setValidationError("");
    setImageFile(file);
    setUploadedImageUrl(URL.createObjectURL(file)); // Generate a preview URL for the file
  }

  // Handle the removal of the currently selected image
  function handleRemoveImage() {
    setImageFile(null); // Clear the selected image file state
    setUploadedImageUrl(""); // Clear the uploaded image preview
    if (inputRef.current) {
      inputRef.current.value = ""; // Reset the file input element
    }
  }

  // Automatically upload the image whenever the `imageFile` changes
  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary(); // Trigger the upload when the file changes
    }
  }, [imageFile]); // Dependency array ensures this effect runs when `imageFile` changes

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

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">Upload</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4 cursor-pointer"
      >
        <Input
          type="file"
          id="imageUpload"
          ref={inputRef}
          onChange={handleImageFileChange}
          className="hidden"
        />

        {/* Display error message if validation fails */}
        {validationError && (
          <p className="text-red-600 text-sm mt-2">{validationError}</p>
        )}

        {!imageFile ? (
          <Label
            htmlFor="imageUpload"
            className="flex flex-col items-center justify-center h-32"
          >
            <UploadCloudIcon size={32} className="text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-300" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon size={32} className="text-muted-foreground mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

AdminProductImageUpload.propTypes = {
  imageFile: PropTypes.object,
  setImageFile: PropTypes.func.isRequired,
  uploadedImageUrl: PropTypes.string,
  setUploadedImageUrl: PropTypes.func.isRequired,
  setImageLoadingState: PropTypes.func.isRequired,
  imageLoadingState: PropTypes.bool.isRequired,
};

export default AdminProductImageUpload;
