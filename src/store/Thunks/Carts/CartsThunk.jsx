import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../../helpers/axiosInstance";
// Add or Update Product in Cart
const addToCartThunk = createAsyncThunk(
  "/cart/addToCart",
  async (formData, { rejectWithValue }) => {
    try {
      console.log(formData);
      const data = {...formData,quantity : formData?.quantity || 1}
      console.log(data);
      const response = await axiosInstance.post("/add_cart",data , { withCredentials: true });
      toast.success("Product added/updated in the cart!");
      return response.data; // Return the updated cart data
    } catch (err) {
      toast.error(err.response?.data?.message || "An unknown error occurred");
      return rejectWithValue(err.response?.data?.message || err.message || "An unknown error occurred");
    }
  }
);

// Remove Product from Cart
const removeFromCartThunk = createAsyncThunk(
  "/cart/removeFromCart",
  async (formData, { rejectWithValue }) => {
    try {
      console.log(formData);
      const response = await axiosInstance.delete("/delete_cart", {
        data: formData, // Send userId and productId in request body
        withCredentials: true,
      });
      toast.success("Product removed from cart!");
      return response.data; // Return the updated cart data
    } catch (err) {
      toast.error(err.response?.data?.message || "An unknown error occurred");
      return rejectWithValue(err.response?.data?.message || err.message || "An unknown error occurred");
    }
  }
);

// Get User's Cart
const getCartThunk = createAsyncThunk(
  "/cart/getCart",
  async (userId, { rejectWithValue }) => {
    try {
      
      const response = await axiosInstance.get(`/get_cart/${userId}`, { withCredentials: true });
      console.log(response.payload);
      
      return response.data; // Return the user's cart data
    } catch (err) {
      toast.error(err.response?.data?.message || "An unknown error occurred");
      return rejectWithValue(err.response?.data?.message || err.message || "An unknown error occurred");
    }
  }
);

export { addToCartThunk, removeFromCartThunk, getCartThunk };
