// store/Thunks/googleLoginThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../helpers/axiosInstance"; // Import axiosInstance
import { toast } from "react-toastify";
import axios from "axios";

const GoogleLoginThunk = createAsyncThunk(
  "googleLogin",
  async (googleToken, { rejectWithValue }) => {
    try {
      // Send the Google token to the backend for verification
      const response = await axios.get("https://gadgets-heaven-81z9.onrender.com/auth/google", { token: googleToken }, { withCredentials: true });
      
      // If successful, show a success toast
      toast.success(response.data.message);
      return response.data; // Return the response data (user data, success message)
    } catch (err) {
      // Improved error handling with toast notifications
      console.error("Google login error:", err.response || err.message || err);
      toast.error(err.response?.data?.message || "Google login failed", {
        className: "toast-error",
      });
      return rejectWithValue(err.response?.data?.message || err.message || "An unknown error occurred");
    }
  }
);

export default GoogleLoginThunk;
