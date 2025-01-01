import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../helpers/axiosInstance";
import { toast } from "react-toastify";

const EmailThunk = createAsyncThunk("verify_email",
    async(formData,{rejectWithValue})=>{
        try{
            const response = await axiosInstance.post('/verify_email',formData)
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

export default EmailThunk;