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

// Async thunk to Login a user (sign-up functionality)
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
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false; // Set loading state to false
      state.isAuthenticated = true; // Mark the user as authenticated
      state.user = action.payload; // Store the user information
    });

    // Handle the rejected state of registerUser
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload?.message || "Not Registerd user "; // Save error message
    });

    // Handle the pending state of loginUser
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true; // Set loading state to true
    });

    // Handle the fulfilled state of loginUser
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log("Login data:", action.payload);
      state.isLoading = false; // Set loading state to false
      state.isAuthenticated = action.payload.success; // Correct the spelling of 'success'

      // Store user information if login is successful
      if (action.payload.success) {
        state.user = action.payload.user; // Store user data (assuming it's in 'user' field)
      } else {
        state.user = null; // If login is not successful, clear user data
      }
    });

    // Handle the rejected state of loginUser
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload?.message || "Login failed"; // Save error message
    });
  },
});

// Export the setUser action so it can be dispatched to update the state
export const { setUser } = authSlice.actions;

// Export the reducer to be included in the store configuration
export default authSlice.reducer;
