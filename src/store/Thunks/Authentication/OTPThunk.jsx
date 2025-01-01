import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";  // Directly using axios
import { toast } from "react-toastify";
import axiosInstance from "../../../helpers/axiosInstance";

const OTPThunk = createAsyncThunk("otp",
    async (formData, { rejectWithValue }) => {
        try {
            console.log(formData);
            const response = await axiosInstance.post('/verify_otp', formData, { withCredentials: true });
            toast.success(response.data.message)
            return response.data;
        } catch (err) {
            // Improved error handling to check if error.response is available
            console.error('OTP verification error: ', err.response || err.message || err);
            toast.error(err.response.data.message,{
                className:"toast-error"
            })
            return rejectWithValue(err.response?.data?.message || err.message || 'An unknown error occurred');
        }
    }
);

export default OTPThunk;
