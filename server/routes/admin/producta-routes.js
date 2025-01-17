// **Import the Express framework** for building web applications and APIs
const express = require("express");

// **Import controller functions** from the `products-controller` file
const {
  handleImageUpload, // Function to handle the image upload process
  addProduct, // Function to add a new product to the database
  fetchProduct, // Function to fetch all products from the database
  editProduct, // Function to edit an existing product by ID
  deleteProduct, // Function to delete an existing product by ID
} = require("../../controllers/admin/products-controller");

// **Import the upload middleware configuration** for handling file uploads
// `upload` is configured to use Cloudinary for storing uploaded images
const { upload } = require("../../config/cloudinary");

// **Create a new Express router instance**
// This instance is used to define and manage routes related to product operations
const router = express.Router();

// **Define a POST route for uploading images**
// Route: "/upload-image"
// Middleware `upload.single("image")` processes a single file with the field name "image"
// The `handleImageUpload` function is invoked to process the uploaded file
router.post("/upload-image", upload.single("image"), handleImageUpload);

// **Define a POST route to add a new product**
// Route: "/add-product"
// The `addProduct` function processes the request body and saves the product to the database
router.post("/add-product", addProduct);

// **Define a GET route to fetch all products**
// Route: "/fetch-product"
// The `fetchProduct` function retrieves a list of all products from the database
router.get("/fetch-product", fetchProduct);

// **Define a PUT route to edit an existing product**
// Route: "/edit-product/id"
// The `editProduct` function updates the details of a product identified by its ID
router.put("/edit-product/:id", editProduct);

// **Define a DELETE route to remove a product**
// Route: "/delete-product/id"
// The `deleteProduct` function deletes a product identified by its ID from the database
router.delete("/delete-product/:id", deleteProduct);

// **Export the router instance**
// This allows the defined routes to be used in other parts of the application
module.exports = router;
