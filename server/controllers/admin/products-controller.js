const { ImageUploadUtil } = require("../../config/cloudinary");
const product = require("../../models/product");

// Handle image upload function
const handleImageUpload = async (req, res) => {
  try {
    // Convert the uploaded image file buffer into a Base64-encoded string
    const b64 = Buffer.from(req.file.buffer).toString("base64");

    // Create a data URL for the image using its MIME type and the Base64-encoded string
    const url = "data:" + req.file.mimetype + ";base64," + b64;

    // Call the utility function (ImageUploadUtil) to upload the image
    // The URL (Base64-encoded image data) is passed as input
    const result = await ImageUploadUtil(url);

    // Send a successful response with the result from the upload utility
    res.json({
      success: true, // Indicate the operation was successful
      result, // The result contains the response from the image upload utility
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.log(error);

    // Send an error response if the image upload fails
    res.json({
      success: false, // Indicate the operation failed
      message: "Image upload failed", // Provide an error message
    });
  }
};

//add new product

const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    // Create a new product object with the data received
    const newAddProduct = new product({
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newAddProduct.save();
    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
    });
  } catch (error) {
    console.log(e);
    res.status(500).json({
      sucess: false,
      message: "Error Add Product",
    });
  }
};

// fetch all products
const fetchroduct = async (req, res) => {
  try {
    const listOfProducts = await product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log(e);
    res.status(500).json({
      sucess: false,
      message: "Error fetch Product",
    });
  }
};
//edit product
const editProduct = async (req, res) => {
  try {
  } catch (error) {
    console.log(e);
    res.status(500).json({
      sucess: false,
      message: "Error edit Product",
    });
  }
};
// delete product
const deleteProduct = async (req, res) => {
  try {
  } catch (error) {
    console.log(e);
    res.status(500).json({
      sucess: false,
      message: "Error Add Product",
    });
  }
};

// Export the function so it can be used in other parts of the application
module.exports = {
  handleImageUpload,
  addProduct,
  fetchroduct,
  editProduct,
  deleteProduct,
};
