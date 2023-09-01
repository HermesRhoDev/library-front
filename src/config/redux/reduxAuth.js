/**
 * Ce code crée un slice Redux nommé "authSlice" qui gère l'état de l'authentification dans l'application. 
 * Il définit un état initial avec des propriétés telles que "loading" 
 * (indiquant si une action est en cours), "userInfo" 
 * (contenant les informations de l'utilisateur connecté), 
 * "error" (contenant les erreurs liées à l'authentification), 
 * et "success" (indiquant si une action a réussi avec succès). 
 * Le slice gère les actions d'inscription, de connexion, de déconnexion, 
 * de récupération de l'utilisateur actuel et de mise à jour du profil. 
 * Il utilise les reducers générés automatiquement par Redux Toolkit pour mettre à jour 
 * l'état en fonction du statut de ces actions.
 * Enfin, le code exporte des sélecteurs qui permettent d'accéder à des parties spécifiques 
 * de l'état dans les composants, et le reducer du slice pour être utilisé 
 * dans le store Redux de l'application.
 */

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
