import { createSlice } from "@reduxjs/toolkit";
import AddCategoryThunk from "../Thunks/Products/AddCategoryThunk";
import AddBrandThunk from "../Thunks/Products/AddBrandThunk";
import AddProductThunk from "../Thunks/Products/AddProductsThunk";
import GetCategoryThunk from "../Thunks/Products/GetCategoryThunk";
import GetBrandThunk from "../Thunks/Products/GetBrandThunk";
import GetProductThunk from "../Thunks/Products/GetProductsThunk";
import GetCategoryProductsThunk from "../Thunks/Products/GetCategoryProductsThunk";
import GetBrandProductsThunk from "../Thunks/Products/GetBrandProducts";
import AddFeatureThunk from "../Thunks/Products/AddFeatureThunk";
import GetFeatureThunk from "../Thunks/Products/GetFeatureThunk";

const initialState = {
    data: [],
    isLoading: false,
    success: false,
    message: "",
    error: false,
  };
  
  // Handlers for fulfilled and rejected states
  const HandleFulfilled = (state, action) => {
    console.log("Fulfilled Payload:", action.payload);
    const { success, message, data } = action.payload || {};
    state.isLoading = false; // Explicitly set isLoading to false
    state.success = success || false;
    state.message = message || "";
  };
  
  const HandleRejected = (state, action) => {
    console.log("Rejected Payload:", action.payload);
    const { success, message, data } = action.payload || {};
    state.isLoading = false; // Explicitly set isLoading to false
    state.error = true;
    state.success = success || false;
    state.message = message || "An error occurred";
    state.data = data || [];
  };
  
  // Create the auth reducer slice
  const productReducer = createSlice({
    name: "product",
    initialState,
    reducers: {
      setProduct: (state, action) => {
        state.user = action.payload;
      },
      
    },
    extraReducers:(builder)=>{
        builder
        .addCase(AddCategoryThunk.pending,(state,action)=>{
            state.isLoading = true
        })
        .addCase(AddCategoryThunk.fulfilled,(state,action)=>{
            HandleFulfilled(state,action)
        })
        .addCase(AddCategoryThunk.rejected,(state,action)=>{
            HandleRejected(state,action)
        })
        .addCase(AddBrandThunk.pending,(state,action)=>{
            state.isLoading = true
        })
        .addCase(AddBrandThunk.fulfilled,(state,action)=>{
            HandleFulfilled(state,action)
        })
        .addCase(AddBrandThunk.rejected,(state,action)=>{
            HandleRejected(state,action)
        })
        .addCase(AddProductThunk.pending,(state,action)=>{
            state.isLoading = true
        })
        .addCase(AddProductThunk.fulfilled,(state,action)=>{
            HandleFulfilled(state,action)
        })
        .addCase(AddProductThunk.rejected,(state,action)=>{
            HandleRejected(state,action)
        })
        .addCase(GetCategoryThunk.pending,(state,action)=>{
            state.isLoading = true
        })
        .addCase(GetCategoryThunk.fulfilled,(state,action)=>{
            HandleFulfilled(state,action)
        })
        .addCase(GetCategoryThunk.rejected,(state,action)=>{
            HandleRejected(state,action)
        })
        .addCase(GetBrandThunk.pending,(state,action)=>{
            state.isLoading = true
        })
        .addCase(GetBrandThunk.fulfilled,(state,action)=>{
            HandleFulfilled(state,action)
        })
        .addCase(GetBrandThunk.rejected,(state,action)=>{
            HandleRejected(state,action)
        })
        .addCase(GetProductThunk.pending,(state,action)=>{
            state.isLoading = true
        })
        .addCase(GetProductThunk.fulfilled,(state,action)=>{
            HandleFulfilled(state,action)
        })
        .addCase(GetProductThunk.rejected,(state,action)=>{
            HandleRejected(state,action)
        })
        .addCase(GetCategoryProductsThunk.pending,(state,action)=>{
            state.isLoading = true
        })
        .addCase(GetCategoryProductsThunk.fulfilled,(state,action)=>{
            HandleFulfilled(state,action)
        })
        .addCase(GetCategoryProductsThunk.rejected,(state,action)=>{
            HandleRejected(state,action)
        })
        .addCase(GetBrandProductsThunk.pending,(state,action)=>{
            state.isLoading = true
        })
        .addCase(GetBrandProductsThunk.fulfilled,(state,action)=>{
            HandleFulfilled(state,action)
        })
        .addCase(GetBrandProductsThunk.rejected,(state,action)=>{
            HandleRejected(state,action)
        })
        .addCase(AddFeatureThunk.pending,(state,action)=>{
            state.isLoading = true
        })
        .addCase(AddFeatureThunk.fulfilled,(state,action)=>{
            HandleFulfilled(state,action)
        })
        .addCase(AddFeatureThunk.rejected,(state,action)=>{
            HandleRejected(state,action)
        })
        .addCase(GetFeatureThunk.pending,(state,action)=>{
            state.isLoading = true
        })
        .addCase(GetFeatureThunk.fulfilled,(state,action)=>{
            HandleFulfilled(state,action)
        })
        .addCase(GetFeatureThunk.rejected,(state,action)=>{
            HandleRejected(state,action)
        })
    }
    
})

export const {setProduct} = productReducer.actions;
export default productReducer.reducer;