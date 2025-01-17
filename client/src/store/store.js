// Import configureStore from Redux Toolkit to set up the store
import { configureStore } from "@reduxjs/toolkit";

// Import the authReducer that handles the authentication state
import authReducer from "./auth-slice/";

import adminProductReducer from "./admin/product-slice";

// Configure the Redux store by passing in an object that defines the reducers
const store = configureStore({
  reducer: {
    // Define the 'auth' slice of state and use the imported authReducer to manage it
    auth: authReducer,
    adminProduct: adminProductReducer,
  },
});

// Export the configured store to be used in the application
export default store;
