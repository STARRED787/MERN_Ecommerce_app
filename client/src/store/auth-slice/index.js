// Import createSlice from Redux Toolkit to create a slice of the Redux store
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state of the authentication
const initialState = {
  isAuthenticated: false, // Track if the user is authenticated or not
  isLoading: false, // Track if a request is loading
  user: null, // Store user information
};

export registerUser = createAsyncThunk('/auth/signup',

  async (formdata) => {
const response = await axios.post('http://localhost:5000/api/auth/signup', formdata);
withCredentials: true;
)

// Create the authentication slice of the store
const authSlice = createSlice({
  // Name of the slice, used to identify the reducer
  name: "auth",

  // Initial state of the slice
  initialState,

  // Reducers define how the state changes in response to actions
  reducers: {
    // setUser action: This will set the user data in the state
    setUser: (state, action) => {
      state.user = action.payload; // Update the user field with the payload from the action
    },
  },
});

// Export the setUser action so it can be dispatched to update the state
export const { setUser } = authSlice.actions;

// Export the reducer to be included in the store configuration
export default authSlice.reducer;
