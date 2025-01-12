import { Label } from "@radix-ui/react-label";
import { useRef } from "react";
import { Input } from "../ui/input";

function AdminProductImageUpload({
  imageFile,
  setImageFile,
  uplodedImgeUrl,
  setUplodedImgeUrl,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    console.log(event.target.files);
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">Upload</Label>
      <div>
        <Input
          type="file"
          id="imageUpload"
          ref={inputRef}
          onChange={handleImageFileChange}
          className=""
        />
      </div>
    </div>
  );
}

export default AdminProductImageUpload;
