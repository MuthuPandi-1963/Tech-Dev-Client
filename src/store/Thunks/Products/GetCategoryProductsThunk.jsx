import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../../helpers/axiosInstance";

const GetCategoryProductsThunk = createAsyncThunk(
  "category/getCategoryProducts",
  async (categoryId, { rejectWithValue }) => {
    try {
      console.log("Fetching category products for:", categoryId);
      const response = await axiosInstance.get(`category/${categoryId}`, {
        withCredentials: true,
      });

      // Display success notification if needed
      // toast.success("Products fetched successfully!", {
        // position: toast.POSITION.TOP_RIGHT,
        // autoClose: 3000,
      // });

      return response.data; // Return the data to be handled in the reducer
    } catch (err) {
      // Handle errors and display an error notification
      toast.error(err.response?.data?.message || "An unknown error occurred", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });

      return rejectWithValue(
        err.response?.data?.message || err.message || "An unknown error occurred"
      );
    }
  }
);

export default GetCategoryProductsThunk;
