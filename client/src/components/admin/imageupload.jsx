function adminProductImageUpload() {
  return (
    <div className="w-full max-w-md mx-auto">
      <label className="text-lg font-semibold mb-2 block">Upload</label>
      <div>
        <input type="file" id="imageUpload" className="hidden" />
      </div>
    </div>
  );
}

export default adminProductImageUpload;
