import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../config/axios/configAxios";

const csrf = () => axios.get("sanctum/csrf-cookie");

const register = createAsyncThunk(
  "auth/register",
  async ({
    first_name,
    last_name,
    pseudo,
    age,
    email,
    password,
    password_confirmation,
  }) => {
    try {
      await csrf();
      const response = await axios.post("register", {
        first_name,
        last_name,
        pseudo,
        age,
        email,
        password,
        password_confirmation,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export default register;