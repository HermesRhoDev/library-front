import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrentUser } from "../../actions/fetchCurrentUser";
import login from "../../actions/loginAction";
import logout from "../../actions/logoutAction";
import register from "../../actions/registerAction";
import updateProfile from "../../actions/updateProfileAction";

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
      .addCase(register.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.success = false;
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
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.userInfo = null;
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state, action) => {
        // Ajout de l'action pour la mise à jour du profil
        state.loading = true;
        state.error = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        // Ajout de l'action pour la mise à jour du profil
        state.userInfo = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        // Ajout de l'action pour la mise à jour du profil
        state.error = true;
        state.loading = false;
      });
  },
});

export const selectUserInfo = (state) => state.auth.userInfo;
export const selectRegisterSuccess = (state) => state.auth.success;

export const authReducer = authSlice.reducer;
