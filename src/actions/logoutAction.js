import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../config/axios/configAxios";

const csrf = () => axios.get("sanctum/csrf-cookie");

const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await csrf();
    await axios.post("logout");
  } catch (error) {
    console.log(error);
  }
});

export default logout;