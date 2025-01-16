// Import the Cloudinary and Multer modules
const cloudinary = require("cloudinary").v2; // Cloudinary library for image upload
const multer = require("multer"); // Multer library for handling file uploads

// Configure Cloudinary with your account credentials
cloudinary.config({
  clud_name: "dyphvszup", // Your Cloudinary cloud name
  api_key: "774861489475243", // Your Cloudinary API key
  api_secret: "uHLqfc_e_mCgB5O_E91tiRBCCuU", // Your Cloudinary API secret
});

// Set up Multer storage to handle files in memory (not saving to disk)
const storage = new multer.memoryStorage(); // Stores file in memory buffer

// Function to handle image uploads to Cloudinary
async function handleImageUpload(file) {
  // Upload file to Cloudinary with the specified options
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto", // Automatically detects the file type (e.g., image, video)
  });

  return result; // Returns the result of the upload (e.g., URL, public_id)
}

// Configure Multer to use the memory storage
const upload = multer({ storage });

// Export the upload middleware and the image upload handler
module.exports = {
  upload, // For handling file uploads via Multer
  handleImageUpload, // For uploading files to Cloudinary
};
