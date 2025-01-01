
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../../helpers/axiosInstance";

const GetProductThunk = createAsyncThunk("/getProduct",
    async (_, { rejectWithValue }) => {
        try {
            console.log(_);
            const response = await axiosInstance.get('/get_product',
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

export default GetProductThunk;
