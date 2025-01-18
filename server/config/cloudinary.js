// Import the Cloudinary and Multer modules
const cloudinary = require("cloudinary").v2; // Cloudinary library for image upload
const multer = require("multer"); // Multer library for handling file uploads

// Configure Cloudinary with your account credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Multer storage to handle files in memory (not saving to disk)
const storage = multer.memoryStorage(); // Stores file in memory buffer

// Function to handle image uploads to Cloudinary
async function ImageUploadUtil(file) {
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
  ImageUploadUtil, // For uploading files to Cloudinary
};
