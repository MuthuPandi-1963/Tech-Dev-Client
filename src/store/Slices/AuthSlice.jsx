import { createSlice } from "@reduxjs/toolkit";
import RegisterThunk from "../Thunks/Authentication/RegisterThunk";
import OTPThunk from "../Thunks/Authentication/OTPThunk";
import LoginThunk from "../Thunks/Authentication/LoginThunk";
import EmailThunk from "../Thunks/Authentication/EmailThunk";
import LogoutThunk from "../Thunks/Authentication/LogoutThunk";
import RefreshAuthThunk from "../Thunks/Authentication/RefreshAuthThunk";
import PasswordThunk from "../Thunks/Authentication/PasswordThunk";
import ResetPasswordOTPThunk from "../Thunks/Authentication/ResetPasswordOTPthunk";
import GoogleLoginThunk from "../Thunks/Authentication/GoogleOauthThunk";
import GitHubLoginThunk from "../Thunks/Authentication/GitHubOauthThunk";

// Initial state
const initialState = {
  user: {},
  isLoading: false,
  isAuthenticated: false,
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
  state.isAuthenticated = data?.isVerified || false;
  state.message = message || "";
  state.user = data || {};
};

const HandleRejected = (state, action) => {
  console.log("Rejected Payload:", action.payload);
  const { success, message, data } = action.payload || {};
  state.isLoading = false; // Explicitly set isLoading to false
  state.error = true;
  state.success = success || false;
  state.isAuthenticated = data?.isVerified || false;
  state.message = message || "An error occurred";
  state.user = data || {};
};

// Create the auth reducer slice
const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // RegisterThunk
      .addCase(RegisterThunk.pending, (state) => {
        console.log("RegisterThunk Pending");
        state.isLoading = true; // Set isLoading to true
      })
      .addCase(RegisterThunk.fulfilled, (state, action) => {
        console.log("RegisterThunk Fulfilled");
        HandleFulfilled(state, action);
      })
      .addCase(RegisterThunk.rejected, (state, action) => {
        console.log("RegisterThunk Rejected");
        HandleRejected(state, action);
      })
      // OTPThunk
      .addCase(OTPThunk.pending, (state) => {
        console.log("OTPThunk Pending");
        state.isLoading = true; // Set isLoading to true
      })
      .addCase(OTPThunk.fulfilled, (state, action) => {
        console.log("OTPThunk Fulfilled");
        HandleFulfilled(state, action);
      })
      .addCase(OTPThunk.rejected, (state, action) => {
        console.log("OTPThunk Rejected");
        HandleRejected(state, action);
      })
      .addCase(LoginThunk.pending, (state) => {
        console.log("LoginThunk Pending");
        state.isLoading = true; // Set isLoading to true
      })
      .addCase(LoginThunk.fulfilled, (state, action) => {
        console.log("LoginThunk Fulfilled");
        HandleFulfilled(state, action);
      })
      .addCase(LoginThunk.rejected, (state, action) => {
        console.log("LoginThunk Rejected");
        HandleRejected(state, action);
      })
      .addCase(EmailThunk.pending, (state) => {
        console.log("EmailThunk Pending");
        state.isLoading = true; // Set isLoading to true
      })
      .addCase(EmailThunk.fulfilled, (state, action) => {
        console.log("EmailThunk Fulfilled");
        HandleFulfilled(state, action);
      })
      .addCase(EmailThunk.rejected, (state, action) => {
        console.log("EmailThunk Rejected");
        HandleRejected(state, action);
      })
      .addCase(LogoutThunk.fulfilled, (state, action) => {
        console.log("LogoutThunk Fulfilled");
        HandleFulfilled(state, action);
      })
      .addCase(LogoutThunk.rejected, (state, action) => {
        console.log("LogoutThunk Rejected");
        HandleRejected(state, action);
      })
      .addCase(RefreshAuthThunk.fulfilled, (state, action) => {
        console.log("RefreshAuthThunk Fulfilled");
        HandleFulfilled(state, action);
      })
      .addCase(PasswordThunk.pending, (state) => {
        console.log("PasswordThunk Pending");
        state.isLoading = true; // Set isLoading to true
      })
      .addCase(PasswordThunk.fulfilled, (state, action) => {
        console.log("PasswordThunk Fulfilled");
        HandleFulfilled(state, action);
      })
      .addCase(PasswordThunk.rejected, (state, action) => {
        console.log("PasswordThunk Rejected");
        HandleRejected(state, action);
      })
      .addCase(ResetPasswordOTPThunk.pending, (state) => {
        console.log("PasswordThunk Pending");
        state.isLoading = true; // Set isLoading to true
      })
      .addCase(ResetPasswordOTPThunk.fulfilled, (state, action) => {
        console.log("PasswordThunk Fulfilled");
        HandleFulfilled(state, action);
      })
      .addCase(ResetPasswordOTPThunk.rejected, (state, action) => {
        console.log("PasswordThunk Rejected");
        HandleRejected(state, action);
      })
      .addCase(GoogleLoginThunk.pending, (state) => {
        console.log("googleLoginThunk Pending");
        state.isLoading = true; // Set isLoading to true
      })
      .addCase(GoogleLoginThunk.fulfilled, (state, action) => {
        console.log("googleLoginThunk Fulfilled");
        HandleFulfilled(state, action);
      })
      .addCase(GoogleLoginThunk.rejected, (state, action) => {
        console.log("googleLoginThunk Rejected");
        HandleRejected(state, action);
      })
      .addCase(GitHubLoginThunk.pending, (state) => {
        console.log("GitHubLoginThunk Pending");
        state.isLoading = true; // Set isLoading to true
      })
      .addCase(GitHubLoginThunk.fulfilled, (state, action) => {
        console.log("GitHubLoginThunk Fulfilled");
        HandleFulfilled(state, action);
      })
      .addCase(GitHubLoginThunk.rejected, (state, action) => {
        console.log("GitHubLoginThunk Rejected");
        HandleRejected(state, action);
      })
  },
});

// Export actions and reducer
export const { setUser } = authReducer.actions;
export default authReducer.reducer;
