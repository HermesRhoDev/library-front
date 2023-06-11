import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../config/axios/configAxios";

export const fetchCollections = createAsyncThunk(
  "collection/fetchCollections",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get("sanctum/csrf-cookie");
      const response = await axios.get("api/mycollections");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);