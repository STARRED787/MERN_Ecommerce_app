const express = require("express");
const {
  userRegister,
  Userlogin,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/signup", userRegister);

module.exports = router;
