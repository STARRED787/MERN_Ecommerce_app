const express = require("express");
const app = express();
const authRoutes = require("./routes/auth/auth-router"); // Importing the router

app.use(express.json()); // Middleware to parse JSON requests

// Mount the authentication routes at '/auth'
app.use("/auth", authRoutes);

// Add other routes and middleware as needed
