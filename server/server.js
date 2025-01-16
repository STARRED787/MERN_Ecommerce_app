const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser"); // Parses cookies attached to the client-side request object
const cors = require("cors"); // Allows your server to handle requests from different origins (domains, ports, or protocols)
const authRouter = require("./routes/auth/auth-routes"); // Routes for authentication
const adminProductsRouter = require("./routes/admin/producta-routes"); // Routes for admin product management

// Create a connection to the MongoDB database
mongoose
  .connect(
    "mongodb+srv://mern_commerce_app:fSPkS9SSs1q1GV9v@cluster0.m49qs.mongodb.net/"
  )
  .then(() => console.log("MongoDB Database connected successfully!"))
  .catch((err) => console.error("Error connecting to the database:", err));

// Create an Express app
const app = express();

// Define the port the server will run on
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing (CORS) for your application
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "expires",
      "pragma",
    ], // Allowed headers
    credentials: true, // Allow cookies and authentication tokens
  })
);

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(express.json());

// Routes for authentication
app.use("/api/auth", authRouter);

// Routes for admin product management
app.use("/api/admin/products", adminProductsRouter);

// Default route to handle unknown paths
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware for better debugging
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
