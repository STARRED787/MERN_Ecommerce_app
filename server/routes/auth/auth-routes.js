const express = require("express"); // Importing express library
const {
  userRegister, // Importing the user registration controller
  Userlogin, // Importing the user login controller
  userLogout, // Importing the logout controller
  authMiddleware, // Importing the authentication middleware
} = require("../../controllers/auth/auth-controller"); // Importing controllers from the 'auth-controller' file

const router = express.Router(); // Creating an instance of express.Router() to define routes

// Define the route for user registration (sign-up)
router.post("/signup", userRegister);
// When a POST request is made to the /signup endpoint, the 'userRegister' controller will handle it

// Define the route for user login (sign-in)
router.post("/signin", Userlogin);
// When a POST request is made to the /signin endpoint, the 'Userlogin' controller will handle it

// Define the route for user logout
router.get("/logout", userLogout);
// When a GET request is made to the /logout endpoint, the 'logout' controller will handle it

// Define the route for user authentication
router.get("/auth", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Authorized User",
    user: req.user,
  });
});

module.exports = router; // Export the router to use in other parts of the application
