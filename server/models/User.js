const mongoose = require("mongoose"); // Import Mongoose for MongoDB interactions

// Define the schema for the User collection
const UserSchema = new mongoose.Schema({
  username: {
    type: String, // Data type for the username field
    required: true, // Field is mandatory
    unique: true, // Ensures no two users have the same username
  },
  email: {
    type: String, // Data type for the email field
    required: true, // Field is mandatory
    unique: true, // Ensures no duplicate email addresses
  },
  password: {
    type: String, // Data type for the password field
    required: true, // Field is mandatory
    unique: true, // Ensures no duplicate passwords (not typical, may want to remove)
  },
  role: {
    type: String, // Data type for the role field
    default: "user", // Default role is "user" if not specified
  },
});

// Create the User model based on the schema
const User = mongoose.model("User", UserSchema);

// Export the model for use in other files
module.exports = User;
