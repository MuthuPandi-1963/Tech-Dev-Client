
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../../helpers/axiosInstance";

const GetSingleProductThunk = createAsyncThunk("/getProduct",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/get_product/${productId}`,
                 { withCredentials: true });
            // toast.success(response.data.message)
            return response.data;
        } catch (err) {
            toast.error(err.response.data.message,{

            })
            return rejectWithValue(err.response?.data?.message || err.message || 'An unknown error occurred');
        }
    }
);

export default GetSingleProductThunk;
