import { createSlice } from "@reduxjs/toolkit";
import login from "../../actions/loginAction";
import logout from "../../actions/logoutAction";
import register from "../../actions/registerAction";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    userInfo: null,
    error: null,
    success: false,
  },
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
