import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "../config/axios/configAxios";

const csrf = () => myAxios.get("sanctum/csrf-cookie");

const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await csrf();
    await myAxios.post("logout");
  } catch (error) {
    console.log(error);
  }
});

export default logout;