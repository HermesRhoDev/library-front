import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosGoogleBookApi } from "../axios/configAxiosGoogle";

export const getBooks = createAsyncThunk("googleBookApi/getBooks", async () => {
  try {
    const response = await axiosGoogleBookApi.get();
    return response.data.items;
  } catch (error) {
    console.log(error);
  }
});

const googleBookApiSlice = createSlice({
  name: "googleBookApi",
  initialState: {
    books: {},
    isLoading: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export const selectBooks = (state) => state.googleBookApi.books;
export const selectLoadingState = (state) => state.googleBookApi.isLoading;
export const selectErrorState = (state) => state.googleBookApi.hasError;

export const googleBookApiReducer = googleBookApiSlice.reducer;