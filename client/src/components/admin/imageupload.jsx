import { Label } from "@radix-ui/react-label";
import { useRef } from "react";
import { Input } from "../ui/input";
import PropTypes from "prop-types";
import { UploadCloudIcon } from "lucide-react";

function AdminProductImageUpload({
  imageFile,
  setImageFile,
  uplodedImgeUrl,
  setUplodedImgeUrl,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
      setUplodedImgeUrl(URL.createObjectURL(selectedFile));
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">Upload</Label>
      <div className=" border-2 border-dashed rounded-lg p-4 ">
        <Input
          type="file"
          id="imageUpload"
          ref={inputRef}
          onChange={handleImageFileChange}
          className="hidden"
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className=" flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon
              size={32}
              className=" text-muted-foreground mb-2"
            />

            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
AdminProductImageUpload.propTypes = {
  imageFile: PropTypes.object,
  setImageFile: PropTypes.func.isRequired,
  uplodedImgeUrl: PropTypes.string,
  setUplodedImgeUrl: PropTypes.func.isRequired,
};

export default AdminProductImageUpload;
