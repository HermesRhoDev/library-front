import { createSlice } from "@reduxjs/toolkit";
import myCollections from "../../actions/myCollectionAction";

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    collectionInfo: null,
    isLoading: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(myCollections.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(myCollections.fulfilled, (state, action) => {
        state.collectionInfo = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(myCollections.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export const selectMyCollections = (state) => state.collection.collectionInfo;
export const selectLoadingState = (state) => state.collection.isLoading;
export const selectErrorState = (state) => state.collection.hasError;

export const collectionReducer = collectionSlice.reducer;