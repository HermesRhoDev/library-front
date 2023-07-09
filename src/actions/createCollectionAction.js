import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "../config/axios/configAxios";

const csrf = () => myAxios.get("sanctum/csrf-cookie");

const createCollection = createAsyncThunk(
  "collection/addBookToCollection",
  async ({ name, user_id }) => {
    try {
      await csrf();
      const response = await myAxios.post("api/collection/store", {
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