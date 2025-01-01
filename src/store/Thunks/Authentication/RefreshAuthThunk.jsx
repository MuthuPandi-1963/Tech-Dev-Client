import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../helpers/axiosInstance";
import { toast } from "react-toastify";
import axios from "axios";

const RefreshAuthThunk = createAsyncThunk("/user",
    async(_,{rejectWithValue})=>{
        try{
            const response = await axiosInstance.get('/get_user')
            console.log(response.data);
            toast.success(response.data.message)
            return response.data
        }catch(err){
            // toast.error(err.response.data.message,{
            //     className:"toast-error"
            // })
            console.log(err);
            
            return rejectWithValue(error.message);
        }

    }
)

export default RefreshAuthThunk;