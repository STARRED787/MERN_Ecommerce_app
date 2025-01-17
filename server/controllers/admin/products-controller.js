const { ImageUploadUtil } = require("../../config/cloudinary");
const product = require("../../models/product");

// **Handle image upload function**
// This function handles the uploading of images to a cloud storage service.
const handleImageUpload = async (req, res) => {
  try {
    // Convert uploaded image file buffer to Base64-encoded string
    const b64 = Buffer.from(req.file.buffer).toString("base64");

    // Create a data URL using the MIME type and Base64-encoded string
    const url = "data:" + req.file.mimetype + ";base64," + b64;

    // Upload the Base64-encoded image data using the utility function
    const result = await ImageUploadUtil(url);

    // Send a success response with the uploaded image data
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    // Handle any errors during the image upload process
    console.log(error);
    res.json({
      success: false,
      message: "Image upload failed",
    });
  }
};

// **Add new product**
// This function adds a new product to the database.
const addProduct = async (req, res) => {
  try {
    // Extract product details from the request body
    const {
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    // Create a new product object
    const newAddProduct = new product({
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    // Save the new product to the database
    await newAddProduct.save();

    // Send a success response after the product is added
    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
    });
  } catch (error) {
    // Handle errors during product addition
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Add Product",
    });
  }
};

// **Fetch all products**
// This function retrieves all products from the database.
const fetchProduct = async (req, res) => {
  try {
    // Fetch all products from the database
    const listOfProducts = await product.find({});

    // Send the list of products as a response
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    // Handle errors during product retrieval
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetch Product",
    });
  }
};

// **Edit product**
// This function edits an existing product based on the provided ID.
const editProduct = async (req, res) => {
  try {
    // Extract product ID from the request parameters
    const { id } = req.params;

    // Extract updated product details from the request body
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    // Find the product by ID
    const findProduct = await product.findById(id);

    // If the product is not found, return a 404 response
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update the product details if provided
    findProduct.image = image || findProduct.image;
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price || findProduct.price;
    findProduct.salePrice = salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;

    // Save the updated product details
    await findProduct.save();

    // Send a success response with the updated product
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (error) {
    // Handle errors during product update
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error edit Product",
    });
  }
};

// **Delete product**
// This function deletes a product based on the provided ID.
const deleteProduct = async (req, res) => {
  try {
    // Extract product ID from the request parameters
    const { id } = req.params;

    // Find and delete the product by ID
    const Product = await product.findByIdAndDelete(id);

    // If the product is not found, return a 404 response
    if (!Product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Send a success response after the product is deleted
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    // Handle errors during product deletion
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error delete Product",
    });
  }
};

// **Export the functions**
// Export the functions so they can be used in other parts of the application
module.exports = {
  handleImageUpload,
  addProduct,
  fetchProduct,
  editProduct,
  deleteProduct,
};
