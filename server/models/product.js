// Import the mongoose library to interact with the MongoDB database
const mongoose = require("mongoose");

// Define a schema for the "Product" collection using mongoose
// The schema defines the structure of the documents stored in the collection
const ProductSchema = new mongoose.Schema(
  {
    // Field to store the URL or path of the product image
    image: String, // Data type: String

    // Field to store the product's name or title
    title: String, // Data type: String

    // Field to store a detailed description of the product
    description: String, // Data type: String

    // Field to store the category under which the product falls (e.g., Electronics, Clothing, etc.)
    category: String, // Data type: String

    // Field to store the brand name of the product
    brand: String, // Data type: String

    // Field to store the regular price of the product
    price: Number, // Data type: Number (numeric values only)

    // Field to store the discounted or sale price of the product
    salePrice: Number, // Data type: Number (numeric values only)

    // Field to store the total stock available for this product
    totalStock: Number, // Data type: Number (numeric values only)
    // Note: "totatlStock" has a typo; it should be corrected to "totalStock"
  },
  {
    // Options for the schema
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields to the documents
  }
);

// Export the model created from the schema
// This allows other files to use the "Product" model for database operations
module.exports = mongoose.model("Product", ProductSchema);

// Explanation of `mongoose.model`:
// - "Product" is the name of the model (collection name in MongoDB will be "products" by default, pluralized)
// - `ProductSchema` is the structure used to create and validate documents in the collection
