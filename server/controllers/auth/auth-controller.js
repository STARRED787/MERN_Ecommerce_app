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
    const checkUser = await User.findOne({ username });

    // Return a generic error message for both invalid username and password
    if (!checkUser)
      return res.status(400).json({
        success: false,
        message: "User doesn't exist", // Unified error message
      });

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword)
      return res.status(400).json({
        success: false,
        message: "Invalid password", // Unified error message
      });

    const token = jwt.sign(
      {
        id: checkUser._id, // Fixed: use _id instead of checkUser_id
        role: checkUser.role,
        username: checkUser.username,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully", // Fixed spelling error
      user: {
        username: checkUser.username,
        role: checkUser.role,
        id: checkUser._id,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Logout controller
const userLogout = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
};

//Auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized User",
    });
  }

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY"); // Corrected this line
    req.user = decoded; // Assign the decoded user data to `req.user`
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = { userRegister, Userlogin, userLogout, authMiddleware }; // Export the login controller here
