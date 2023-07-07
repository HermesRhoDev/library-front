import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../config/axios/configAxios";

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async () => {
    try {
      const response = await axios.get("api/user");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
