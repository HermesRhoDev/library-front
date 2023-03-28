import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../config/axios/configAxios";

const csrf = () => axios.get("sanctum/csrf-cookie");

const myCollections = createAsyncThunk("collection/myCollections", async () => {
  try {
    await csrf();
    const response = await axios.get("api/mycollections");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export default myCollections;
