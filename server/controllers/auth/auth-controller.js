const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

//register controller
const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
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
