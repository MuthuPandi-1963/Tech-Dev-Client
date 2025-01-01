import { createSlice } from "@reduxjs/toolkit";
// import GetOrderThunk from "../Thunks/Orders/GetOrderThunk"; // Import the thunk for getting orders
import AddOrderThunk from "../Thunks/Orders/AddOrderThunk";

const initialState = {
  order: null,
  orders: [],
  isLoading: false,
  success: false,
  message: "",
  error: false,
};

// Handlers for fulfilled and rejected states
const HandleFulfilled = (state, action) => {
  console.log("Fulfilled Payload:", action.payload);
  const { success, message, data } = action.payload || {};
  state.isLoading = false; // Explicitly set isLoading to false
  state.success = success || false;
  state.message = message || "";
  state.order = data?.order || state.order;
  state.orders = data?.orders || state.orders;
};

const HandleRejected = (state, action) => {
  console.log("Rejected Payload:", action.payload);
  const { success, message, data } = action.payload || {};
  state.isLoading = false; // Explicitly set isLoading to false
  state.error = true;
  state.success = success || false;
  state.message = message || "An error occurred";
  state.order = data || [];
};

// Create the order reducer slice
const orderReducer = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    clearOrderState: (state) => {
      state.order = null;
      state.orders = [];
      state.isLoading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // Handle Create Order
    builder
      .addCase(AddOrderThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddOrderThunk.fulfilled, (state, action) => {
        HandleFulfilled(state, action);
      })
      .addCase(AddOrderThunk.rejected, (state, action) => {
        HandleRejected(state, action);
      })
      
      // Handle Get Orders (for admin)
    //   .addCase(GetOrderThunk.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(GetOrderThunk.fulfilled, (state, action) => {
    //     HandleFulfilled(state, action);
    //   })
    //   .addCase(GetOrderThunk.rejected, (state, action) => {
    //     HandleRejected(state, action);
    //   });
  },
});

export const { setOrder, setOrders, clearOrderState } = orderReducer.actions;
export default orderReducer.reducer;
