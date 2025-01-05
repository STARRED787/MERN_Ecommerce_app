const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser"); // Fixed typo: "cokieParser" -> "cookieParser"
const cors = require("cors");
//create database connection
// create a database connection separate file and import it here

mongoose.connect(
  "mongodb+srv://mern_commerce_app:fSPkS9SSs1q1GV9v@cluster0.m49qs.mongodb.net/"
);
then(() => console.log("Database connected successfully!")).catch((err) =>
  console.log(err)
);

// Create an express app
const app = express();
// Define the port the server will run on
const PORT = process.env.PORT || 5000;
