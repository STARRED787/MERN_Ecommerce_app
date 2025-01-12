import { Label } from "@radix-ui/react-label";
import { useRef } from "react";
import { Input } from "../ui/input";
import PropTypes from "prop-types";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

function AdminProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl, // Corrected prop name
  setUploadedImageUrl, // Corrected prop name
}) {
  const inputRef = useRef(null);

  // Handle file change when a user selects a file
  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
      setUploadedImageUrl(URL.createObjectURL(selectedFile)); // Create URL for preview
    }
  }

  // Handle dragging over the drop area
  function handleDragOver(event) {
    event.preventDefault();
  }

  // Handle dropping a file into the drop area
  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
      setUploadedImageUrl(URL.createObjectURL(droppedFile)); // Create URL for preview
    }
  }

  // Handle removing the selected image
  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
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
