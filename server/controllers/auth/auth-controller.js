const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

//register controller
const userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashpassword,
    });

    await newUser.save();
    res.status(201).json({
      success: true, // Ensure this property is included
      message: "User created successfully",
    });
  } catch (e) {
    // In your register controller
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
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

//login controller
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const checkUser = await User.findOne({ username });
    if (!checkUser) {
      return res.status(400).json({
        success: false,
        message: "Youre Username is incorrect",
      });
    }
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Youre Password is incorrect",
      });
    }
  } catch (e) {
    // In your register controller
    console.log(e);
    if (e.code === 11000) {
      // MongoDB Duplicate Key Error
      if (e.message.includes("username")) {
        return res.status(400).json({
          success: false,
          message: "Username is Wrong",
        });
      } else if (e.message.includes("email")) {
        return res.status(400).json({
          success: false,
          message: "Password is Wrong",
        });
      }
    }
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

//logout controller

//auth middleware

module.exports = { userRegister };
