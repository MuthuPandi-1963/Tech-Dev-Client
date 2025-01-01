import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../../helpers/axiosInstance";

const GetBrandProductsThunk = createAsyncThunk(
  "brand/getBrandProducts",
  async (brandId, { rejectWithValue }) => {
    try {
      console.log("Fetching category products for:", brandId);
      const response = await axiosInstance.get(`brand/${brandId}`, {
        withCredentials: true,
      });

      // Display success notification if needed
      toast.success("Products fetched successfully!", {
        // position: toast.POSITION.TOP_RIGHT,
        // autoClose: 3000,
      });

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

export default GetBrandProductsThunk;
