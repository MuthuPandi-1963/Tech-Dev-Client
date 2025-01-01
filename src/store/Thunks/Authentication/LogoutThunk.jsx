import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../helpers/axiosInstance";
import { toast } from "react-toastify";

const LogoutThunk = createAsyncThunk("logout",
    async(_,{rejectWithValue})=>{
        try{
            const response = await axiosInstance.get('/logout',{withCredentials:true})
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

export default LogoutThunk;