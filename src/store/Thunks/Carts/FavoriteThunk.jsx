import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../../helpers/axiosInstance";

// Add or Update Product in Favorites
const addToFavoriteThunk = createAsyncThunk(
  "/favorite/addToFavorite",
  async (formData, { rejectWithValue }) => {
    try {
      const data = { ...formData, quantity: formData?.quantity || 1 };
      const response = await axiosInstance.post("/add_favorite", data, { withCredentials: true });
      toast.success("Product added/updated in favorites!");
      return response.data; // Return the updated favorite data
    } catch (err) {
      toast.error(err.response?.data?.message || "An unknown error occurred");
      return rejectWithValue(err.response?.data?.message || err.message || "An unknown error occurred");
    }
  }
);

// Remove Product from Favorites
const removeFromFavoriteThunk = createAsyncThunk(
  "/favorite/removeFromFavorite",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/remove_favorite", {
        data: formData, // Send userId and productId in the request body
        withCredentials: true,
      });
      toast.success("Product removed from favorites!");
      return response.data; // Return the updated favorite data
    } catch (err) {
      console.log(err);
      
      toast.error(err.response?.data?.message || "An unknown error occurred");
      return rejectWithValue(err.response?.data?.message || err.message || "An unknown error occurred");
    }
  }
);

// Get User's Favorites
const getFavoriteThunk = createAsyncThunk(
  "/favorite/getFavorite",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/get_favorite/${userId}`, { withCredentials: true });
      console.log(response.payload);
      
      return response.data; // Return the user's favorite data
    } catch (err) {
      toast.error(err.response?.data?.message || "An unknown error occurred");
      return rejectWithValue(err.response?.data?.message || err.message || "An unknown error occurred");
    }
  }
);

export { addToFavoriteThunk, removeFromFavoriteThunk, getFavoriteThunk };
