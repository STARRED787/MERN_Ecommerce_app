// Import createSlice and createAsyncThunk from Redux Toolkit to create slices and handle async actions
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state of the authentication slice
const initialState = {
  isAuthenticated: false, // Track if the user is authenticated or not
  isLoading: false, // Track if an async request is in progress
  user: null, // Store user information
};

// Async thunk to register a user (sign-up functionality)
export const registerUser = createAsyncThunk(
  "/auth/signup", // Action type
  async (formData, { rejectWithValue }) => {
    try {
      // Send POST request to register the user
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData,
        { withCredentials: true } // Include cookies in the request
      );
      return response.data; // Return the response data to the thunk
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle and return error
    }
  }
);

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

  // Extra reducers to handle the lifecycle of async actions
  extraReducers: (builder) => {
    // Handle the pending state of registerUser
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true; // Set loading state to true
    });

    // Handle the fulfilled state of registerUser
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false; // Set loading state to false
      state.isAuthenticated = true; // Mark the user as authenticated
      state.user = null; // Store the user information
    });

    // Handle the rejected state of registerUser
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false; // Set loading state to false
      state.isAuthenticated = false; // Mark the user as unauthenticated
      state.user = null; // Clear any existing user information
      console.error("Registration error:", action.payload); // Log the error for debugging
    });
  },
});

// Export the setUser action so it can be dispatched to update the state
export const { setUser } = authSlice.actions;

// Export the reducer to be included in the store configuration
export default authSlice.reducer;
