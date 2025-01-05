// Import configureStore from Redux Toolkit to set up the store
import { configureStore } from "@reduxjs/toolkit";

// Import the authReducer that handles the authentication state
import authReducer from "./auth-slice/";

// Configure the Redux store by passing in an object that defines the reducers
const store = configureStore({
  reducer: {
    // Define the 'auth' slice of state and use the imported authReducer to manage it
    auth: authReducer,
  },
});

// Export the configured store to be used in the application
export default store;
