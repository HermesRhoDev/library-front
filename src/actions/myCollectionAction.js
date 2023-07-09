import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "../config/axios/configAxios";

export const fetchCollections = createAsyncThunk(
  "collection/fetchCollections",
  async (_, { rejectWithValue }) => {
    try {
      await myAxios.get("sanctum/csrf-cookie");
      const response = await myAxios.get("api/mycollections");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);