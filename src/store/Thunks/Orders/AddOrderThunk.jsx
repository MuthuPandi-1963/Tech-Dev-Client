import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../../helpers/axiosInstance";

const AddOrderThunk = createAsyncThunk(
  "/addOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      console.log(orderData);
      const response = await axiosInstance.post('/add_order', orderData, {
        withCredentials: true,
      });
      toast.success(response.data.message || "Order placed successfully!");
      return response.data;
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Failed to place order. Please try again later."
      );
      return rejectWithValue(err.response?.data?.message || err.message || "An unknown error occurred");
    }
  }
);

export default AddOrderThunk;
