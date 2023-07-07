import { createSlice } from "@reduxjs/toolkit";
import createCollection from "../../actions/createCollectionAction";
import { fetchCollections } from "../../actions/myCollectionAction";

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    collectionInfo: null,
    isLoading: false,
    hasError: false,
    success: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.collectionInfo = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(createCollection.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        state.success = true;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(createCollection.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export const selectFetchCollections = (state) =>
  state.collection.collectionInfo;
export const selectLoadingState = (state) => state.collection.isLoading;
export const selectErrorState = (state) => state.collection.hasError;
export const selectCollectionSuccess = (state) => state.collection.success;

export const collectionReducer = collectionSlice.reducer;
