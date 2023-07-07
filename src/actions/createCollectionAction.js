import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../config/axios/configAxios";

const csrf = () => axios.get("sanctum/csrf-cookie");

const createCollection = createAsyncThunk(
  "collection/addBookToCollection",
  async ({ name, user_id }) => {
    try {
      await csrf();
      const response = await axios.post("api/collection/store", {
        name,
        user_id,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export default createCollection;