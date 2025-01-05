const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser"); //parses cookies attached to the client-side request object
const cors = require("cors"); //Allows your server to handle requests from different origins (domains, ports, or protocols)

//create database connection
mongoose
  .connect(
    "mongodb+srv://mern_commerce_app:fSPkS9SSs1q1GV9v@cluster0.m49qs.mongodb.net/"
  )
  .then(() => console.log("MONGODb Database connected successfully!"))
  .catch((err) => console.log("Error connecting to the database:", err));

// Create an express app
const app = express();
// Define the port the server will run on
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing (CORS) for your application
app.use(
  cors({
    // Specify the origin (domain) allowed to make requests to your server
    // In this case, only requests from "http://localhost:5173/" (your front-end application) are allowed
    origin: "http://localhost:5173/",

    // Define the HTTP methods that are allowed for cross-origin requests
    methods: ["GET", "POST", "PUT", "DELETE"],

    // Specify the headers that can be sent with the request from the client
    allowedHeaders: [
      "Content-Type", // Specifies the format of the request body (e.g., JSON)
      "Authorization", // Used for sending authentication tokens (e.g., JWT)
      "Cache-Control", // Used for caching policies
      "expires", // Used for expiration metadata
      "pragma", // Often used in HTTP caching headers
    ],

    // Enable cookies and other credentials (e.g., authentication tokens) to be sent with cross-origin requests
    // This is necessary for handling user sessions or authentication
    credentials: true,
  })
);

// Middleware to parse cookies
// This enables your app to parse and access cookies sent by the client in requests.
app.use(cookieParser());

// Middleware to parse JSON bodies
// This allows your server to accept and parse JSON data sent in the body of POST, PUT, or PATCH requests.
app.use(express.json());

// Start the server
// This tells the Express app to listen for incoming requests on the specified `PORT`.
// The callback function is executed once the server starts, logging a message to confirm it's running.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
