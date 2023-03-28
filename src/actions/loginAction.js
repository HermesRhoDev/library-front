import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../config/axios/configAxios";

const csrf = () => axios.get("sanctum/csrf-cookie");

const login = createAsyncThunk("auth/login", async ({ email, password }) => {
  try {
    await csrf();
    const response = await axios.post("login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export default login;