import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { myAxios } from "../config/axios/configAxios";

const csrf = () => myAxios.get("sanctum/csrf-cookie");

const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ first_name, last_name, pseudo, age, email }) => {
    try {
      await csrf();
      const response = await myAxios.put("api/profile/update", {
        first_name,
        last_name,
        pseudo,
        age,
        email,
      });
      return response.data;
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.data
      ) {
        const errorMessage = error.response.data.message;
        throw new Error(errorMessage);
      } else {
        throw error;
      }
    }
  }
);

export default updateProfile;