import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../helpers/axiosInstance";
import { toast } from "react-toastify";

const PasswordThunk = createAsyncThunk("reset_password",
    async(formData,{rejectWithValue})=>{
        try{
            const response = await axiosInstance.post('/reset_password',formData)
            console.log(response.data);
            
            toast.success(response.data.message)
            return response.data
        }catch(err){
            toast.error(err.response.data.message,{
                className:"toast-error"
            })
            return rejectWithValue(error.message);
        }

    }
)

export default PasswordThunk;