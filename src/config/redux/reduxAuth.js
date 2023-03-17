import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import register from "../../actions/authAction";
import { axios } from "../axios/configAxios";

const csrf = () => axios.get("sanctum/csrf-cookie");

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await csrf();
    await axios.post("logout");
  } catch (error) {
    console.log(error);
  }
});

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
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
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    userInfo: null,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.userInfo = payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.userInfo = payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(logout.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.userInfo = null;
        state.loading = false;
        state.error = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const selectUserInfo = (state) => state.auth.userInfo;

export const authReducer = authSlice.reducer;
