const express = require("express");
const { userRegister } = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("signup", userRegister);
