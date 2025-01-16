import { Label } from "@radix-ui/react-label";
import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import PropTypes from "prop-types";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";

function AdminProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl, // Corrected prop name
  setUploadedImageUrl, // Corrected prop name
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
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      ); // Send a POST request to upload the image

      if (response.data?.sucess) {
        setUploadedImageUrl(response.data.result.url); // Update the uploaded image URL state with the response
        console.log(response.data); // Log the response for debugging
      }
    } catch (error) {
      console.error("Image upload failed:", error); // Log errors if the upload fails
    }
  }

  // Automatically upload the image whenever the `imageFile` changes
  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary(); // Trigger the upload when the file changes
    }
  }, [imageFile]); // Dependency array ensures this runs only when `imageFile` changes
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
          id="imageUpload" // Ensure this matches with htmlFor in Label
          ref={inputRef}
          onChange={handleImageFileChange}
          className="hidden"
        />
        {!imageFile ? (
          <Label
            htmlFor="imageUpload" // This must be the same as the input's id
            className="flex flex-col items-center justify-center h-32"
          >
            <UploadCloudIcon size={32} className="text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
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

// PropTypes validation
AdminProductImageUpload.propTypes = {
  imageFile: PropTypes.object,
  setImageFile: PropTypes.func.isRequired,
  uploadedImageUrl: PropTypes.string, // Correct prop name
  setUploadedImageUrl: PropTypes.func.isRequired, // Correct prop validation
};

export default AdminProductImageUpload;
