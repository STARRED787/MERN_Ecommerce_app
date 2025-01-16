const { ImageUploadUtil } = require("../../config/cloudinary");

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

// Export the function so it can be used in other parts of the application
module.exports = { handleImageUpload };
