import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../config/axios/configAxios.js";

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
    if (error.response.status === 422) {
      const errorMessage = error.response.data.message;
      throw new Error(errorMessage);
    }
    throw error;
  }
});

export default login;