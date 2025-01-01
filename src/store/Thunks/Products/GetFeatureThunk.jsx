
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../../helpers/axiosInstance";

const GetFeatureThunk = createAsyncThunk("/getFeature",
    async (formData, { rejectWithValue }) => {
        try {
            console.log(formData);
            const response = await axiosInstance.get('/get_feature',
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

export default GetFeatureThunk;
