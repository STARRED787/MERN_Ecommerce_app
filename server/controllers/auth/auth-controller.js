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
      //sucess: true,
      //message: "user created successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      sucess: false,
      message: "some error occured",
    });
  }
};

//login controller
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      sucess: false,
      message: "some error occured",
    });
  }
};

//logout controller

//auth middleware

module.exports = { userRegister };
