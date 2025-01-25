// Import createSlice and createAsyncThunk from Redux Toolkit to create slices and handle async actions
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state of the authentication slice
const initialState = {
  isAuthenticated: false, // Track if the user is authenticated or not
  isLoading: true, // Track if an async request is in progress
  user: null, // Store user information
};

// Async thunk to register a user (sign-up functionality)
export const registerUser = createAsyncThunk(
  "/auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData,
        { withCredentials: true }
      );
      return response.data; // Ensure this data contains the `success` property
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to Login a user (sign-in functionality)
export const loginUser = createAsyncThunk(
  "/auth/signin",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        formData,
        { withCredentials: true }
      );
      return response.data; // Ensure this data contains the `success` property
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to Login a user (sign-in functionality)
export const logOutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/logout",
    {},

    { withCredentials: true }
  );
  return response.data; // Ensure this data contains the `success` property
});

// Async thunk to chech a user
export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/auth/checkauth",
      {
        withCredentials: true, // Send cookies
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Expires: "60m",
        },
      }
    );
    return response.data; // Return the server response
  } catch (error) {
    throw error.response?.data || new Error("Failed to authenticate user");
  }
});

// Create the authentication slice
const authSlice = createSlice({
  name: "auth", // Name of the slice, used in actions and reducers
  initialState, // Initial state for the slice

  reducers: {
    // Action to manually set user data in the state
    setUser: (state, action) => {
      state.user = action.payload; // Update the user field with the provided payload
      state.isAuthenticated = !!action.payload; // Set isAuthenticated based on whether user data exists
    },
  },

  //***register***//
  // Extra reducers to handle the lifecycle of async actions
  extraReducers: (builder) => {
    // Handle the pending state of registerUser
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true; // Set loading state to true
    });

    // Handle the fulfilled state of registerUser
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false; // Set loading state to false
      state.isAuthenticated = false; // Mark the user as authenticated
      state.user = action.payload; // Store the user information
    });

    // Handle the rejected state of registerUser
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload?.message || "Not Registerd user "; // Save error message
    });

    // ***Login*** //
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true; // Set loading state to true while the request is in progress
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false; // Set loading state to false after successful login
      state.isAuthenticated = action.payload.success; // Mark the user as authenticated
      state.user = action.payload.success ? action.payload.user : null; // Store user information if login is successful
      state.error = null; // Clear any previous error
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false; // Set loading state to false after failure
      state.isAuthenticated = false; // Mark the user as not authenticated
      state.user = null; // Clear any stored user information
      state.error = action.payload?.message || "Not Registered user"; // Set error message
    });

    //***LogOut***//
    // Handle the fulfilled state of logOutUser
    builder.addCase(logOutUser.fulfilled, (state) => {
      state.isLoading = false; // Set loading state to false
      state.isAuthenticated = false; // Mark the user as authenticated
      state.user = null; // Store the user information
    });

    //***checkAuth***//
    // Handle the pending state of authCheck
    builder.addCase(checkAuth.pending, (state) => {
      state.isLoading = true; // Set loading state to true
    });

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false; // Set loading state to false
      state.isAuthenticated = action.payload.success; // Check the success flag
      state.user = action.payload.success ? action.payload.user : null; // Store user info
    });

    builder.addCase(checkAuth.rejected, (state) => {
      state.isLoading = false; // Set loading state to false
      state.isAuthenticated = false; // Mark the user as not authenticated
      state.user = null; // Clear user data
    });
  },
});

// Export the setUser action so it can be dispatched to update the state
export const { setUser } = authSlice.actions;

// Export the reducer to be included in the store configuration
export default authSlice.reducer;
