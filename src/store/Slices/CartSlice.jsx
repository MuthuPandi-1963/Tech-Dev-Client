import { createSlice } from "@reduxjs/toolkit";
import { addToCartThunk, getCartThunk, removeFromCartThunk } from "../Thunks/Carts/CartsThunk";

const initialState = {
  cart: [], // Array to store cart items
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
  state.cart = data?.products || state.cart; // Update the cart with new data
};

const HandleRejected = (state, action) => {
  console.log("Rejected Payload:", action.payload);
  const { success, message, data } = action.payload || {};
  state.isLoading = false; // Explicitly set isLoading to false
  state.error = true; // Mark as error
  state.success = success || false; // Update success status
  state.message = message || "An error occurred"; // Default message
  state.cart = data || []; // Reset cart state if needed
};

// Create the cart reducer slice
const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload; // Set the entire cart
    },
    clearCartState: (state) => {
      state.cart = []; // Clear the cart
      state.isLoading = false;
      state.success = false;
      state.error = false;
      state.message = ""; // Reset message
    },
  },
  extraReducers: (builder) => {
    // Handle Add to Cart
    builder
      .addCase(addToCartThunk.pending, (state) => {
        state.isLoading = true; // Set loading state
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        HandleFulfilled(state, action); // Handle success
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        HandleRejected(state, action); // Handle failure
      })
      
    // Handle Update Cart
    builder
      .addCase(getCartThunk.pending, (state) => {
        state.isLoading = true; // Set loading state
      })
      .addCase(getCartThunk.fulfilled, (state, action) => {
        HandleFulfilled(state, action); // Handle success
      })
      .addCase(getCartThunk.rejected, (state, action) => {
        HandleRejected(state, action); // Handle failure
      })

    // Handle Remove from Cart
    builder
      .addCase(removeFromCartThunk.pending, (state) => {
        state.isLoading = true; // Set loading state
      })
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        HandleFulfilled(state, action); // Handle success
      })
      .addCase(removeFromCartThunk.rejected, (state, action) => {
        HandleRejected(state, action); // Handle failure
      });
  },
});

export const { setCart, clearCartState } = cartReducer.actions;
export default cartReducer.reducer;
