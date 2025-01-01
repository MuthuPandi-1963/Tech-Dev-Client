import { createSlice } from "@reduxjs/toolkit";
import { addToFavoriteThunk, getFavoriteThunk, removeFromFavoriteThunk } from "../Thunks/Carts/FavoriteThunk";

const initialState = {
  favorites: [], // Array to store favorite items
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
  state.favorites = data?.products || state.favorites; // Update the favorites with new data
};

const HandleRejected = (state, action) => {
  console.log("Rejected Payload:", action.payload);
  const { success, message, data } = action.payload || {};
  state.isLoading = false; // Explicitly set isLoading to false
  state.error = true; // Mark as error
  state.success = success || false; // Update success status
  state.message = message || "An error occurred"; // Default message
  state.favorites = data || []; // Reset favorites state if needed
};

// Create the favorites reducer slice
const favoriteReducer = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload; // Set the entire favorites list
    },
    clearFavoritesState: (state) => {
      state.favorites = []; // Clear the favorites list
      state.isLoading = false;
      state.success = false;
      state.error = false;
      state.message = ""; // Reset message
    },
  },
  extraReducers: (builder) => {
    // Handle Add to Favorite
    builder
      .addCase(addToFavoriteThunk.pending, (state) => {
        state.isLoading = true; // Set loading state
      })
      .addCase(addToFavoriteThunk.fulfilled, (state, action) => {
        HandleFulfilled(state, action); // Handle success
      })
      .addCase(addToFavoriteThunk.rejected, (state, action) => {
        HandleRejected(state, action); // Handle failure
      })
      
    // Handle Get Favorite
    builder
      .addCase(getFavoriteThunk.pending, (state) => {
        state.isLoading = true; // Set loading state
      })
      .addCase(getFavoriteThunk.fulfilled, (state, action) => {
        HandleFulfilled(state, action); // Handle success
      })
      .addCase(getFavoriteThunk.rejected, (state, action) => {
        HandleRejected(state, action); // Handle failure
      })

    // Handle Remove from Favorite
    builder
      .addCase(removeFromFavoriteThunk.pending, (state) => {
        state.isLoading = true; // Set loading state
      })
      .addCase(removeFromFavoriteThunk.fulfilled, (state, action) => {
        HandleFulfilled(state, action); // Handle success
      })
      .addCase(removeFromFavoriteThunk.rejected, (state, action) => {
        HandleRejected(state, action); // Handle failure
      });
  },
});

export const { setFavorites, clearFavoritesState } = favoriteReducer.actions;
export default favoriteReducer.reducer;
