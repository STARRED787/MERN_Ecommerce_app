// Import the Express framework for building web applications
const express = require("express");

// Import the image upload handler from the products-controller
const {
  handleImageUpload, // Function to handle the image upload process
} = require("../../controllers/admin/products-controller");

// Import the upload middleware configuration (Cloudinary in this case)
const { upload } = require("../../config/cloudinary");

// Create a new Express router instance
const router = express.Router();

// Define a POST route for uploading images
// Route: "/upload-image"
// Middleware `upload.single("image")` processes a single file with the field name "image"
// The `handleImageUpload` function handles the uploaded file
router.post("/upload-image", upload.single("image"), handleImageUpload);

// Export the router so it can be used in other parts of the application
module.exports = router;
