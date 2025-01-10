const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

// Register controller
const userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Hash the password before saving to the database
    const hashpassword = await bcrypt.hash(password, 12);

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashpassword,
    });

    // Save the user to the database
    await newUser.save();

    // Return a success message after user is saved
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (e) {
    // Handle MongoDB errors like duplicate keys (username/email)
    console.log(e);
    if (e.code === 11000) {
      // MongoDB Duplicate Key Error
      if (e.message.includes("username")) {
        return res.status(400).json({
          success: false,
          message: "Username is already taken.",
        });
      } else if (e.message.includes("email")) {
        return res.status(400).json({
          success: false,
          message: "Email is already registered.",
        });
      }
    }
    // If an error occurs that isn't related to the above, return a generic server error
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Login controller
const Userlogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find the user by username
    const checkUser = await User.findOne({ username });
    if (!checkUser) {
      return res.status(400).json({
        success: false,
        message: "Your Username is incorrect",
      });
    }

    // Compare the provided password with the hashed password stored in the DB
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Your Password is incorrect",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
      "CLIENT_SECRET_KEY", // Make sure to replace this with an actual secret key
      { expiresIn: "1h" } // Token will expire in 1 hour
    );

    // Send the token as a cookie and respond with the user info
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false, // Only set 'secure' to true in production
      })
      .json({
        success: true,
        message: "Login Successful",
        user: {
          username: checkUser.username,
          email: checkUser.email,
          role: checkUser.role,
        },
      });
  } catch (e) {
    // Log the error and handle specific cases if necessary
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Logout controller (implement later)
const logout = (req, res) => {
  // Clear the cookie on logout
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// Middleware (For authentication) can be added here later

module.exports = { userRegister, Userlogin, logout }; // Export the login controller here
