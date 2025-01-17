// Import required modules from Redux Toolkit and Axios
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Axios is used for making API calls

// **Define the initial state of the slice**
const initialState = {
  isLoading: false, // Indicates whether a request is in progress
  productList: [], // Stores the list of products fetched from the backend
};

// **Async Thunk to add a new product**
// Handles the API call to add a product and returns the response
export const addNewProduct = createAsyncThunk(
  "adminProduct/addNewProduct", // Unique identifier for this thunk
  async (formData, { rejectWithValue }) => {
    try {
      // Make a POST request to add a new product
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/add-product",
        formData, // Data sent to the backend
        {
          headers: {
            "Content-Type": "application/json", // Inform the backend that the data is JSON
          },
        }
      );
      return response.data; // Return the response data
    } catch (error) {
      // Handle errors and return rejected value
      return rejectWithValue(error.response?.data || "Error adding product");
    }
  }
);

// **Async Thunk to fetch products**
// Handles the API call to fetch all products
export const fetchProduct = createAsyncThunk(
  "adminProduct/fetchProduct", // Unique identifier for this thunk
  async (_, { rejectWithValue }) => {
    try {
      // Make a GET request to fetch all products
      const response = await axios.get(
        "http://localhost:5000/api/admin/products/fetch-product"
      );
      return response.data; // Return the fetched product list
    } catch (error) {
      // Handle errors and return rejected value
      return rejectWithValue(error.response?.data || "Error fetching products");
    }
  }
);

// **Async Thunk to edit a product**
// Handles the API call to edit an existing product by ID
export const editProduct = createAsyncThunk(
  "adminProduct/editProduct", // Unique identifier for this thunk
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      // Make a PUT request to edit a product
      const response = await axios.put(
        `http://localhost:5000/api/admin/products/edit-product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json", // Inform the backend that the data is JSON
          },
        }
      );
      return response.data; // Return the updated product data
    } catch (error) {
      // Handle errors and return rejected value
      return rejectWithValue(error.response?.data || "Error editing product");
    }
  }
);

// **Async Thunk to delete a product**
// Handles the API call to delete an existing product by ID
export const deleteProduct = createAsyncThunk(
  "adminProduct/deleteProduct", // Unique identifier for this thunk
  async (id, { rejectWithValue }) => {
    try {
      // Make a DELETE request to delete a product
      const response = await axios.delete(
        `http://localhost:5000/api/admin/products/delete-product/${id}`
      );
      return response.data; // Return the success message or confirmation
    } catch (error) {
      // Handle errors and return rejected value
      return rejectWithValue(error.response?.data || "Error deleting product");
    }
  }
);

// **Create a slice to manage product state**
// A slice combines actions, reducers, and the initial state in one object
const productSlice = createSlice({
  name: "adminProduct", // Name of the slice
  initialState, // Initial state for this slice
  reducers: {}, // Synchronous reducers (if needed in the future)
  extraReducers: (builder) => {
    // **Handle extra reducers for async actions**
    builder
      // **Add case for pending state of fetching products**
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true; // Indicate loading state
      })
      // **Add case for fulfilled state of fetching products**
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false; // Reset loading state
        state.productList = action.payload; // Update the product list
      })
      // **Add case for rejected state of fetching products**
      .addCase(fetchProduct.rejected, (state) => {
        state.isLoading = false; // Reset loading state
      });
  },
});

// Export the reducer to integrate it into the Redux store
export default productSlice.reducer;
