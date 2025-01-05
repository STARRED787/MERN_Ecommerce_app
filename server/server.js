const express = require("express");
const mongoose = require("mongoose");
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
const PORT = process.env.PORT || 5000;
