import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoading: false,
    productList: [],
}

const addNewProduct = createAsyncThunk(
    '/products/addNewProduct',
    async (productData, {rejectWithValue}) => {
        try {
            const response = await axios.post('http://localhost:5000/api/products', productData, {withCredentials: true});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const productSlice = createSlice({
    name: 'adminProduct',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload;
            })
            .addCase(fetchProductList.rejected, (state) => {
                state.isLoading = false;
            })
    }
)}