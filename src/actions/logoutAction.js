/**
 * Ce code définit une action asynchrone "logout" en utilisant Redux Toolkit. 
 * Cette action gère la déconnexion de l'utilisateur en effectuant une requête POST 
 * vers l'endpoint "logout" pour mettre fin à la session de l'utilisateur. 
 * Avant la requête, elle appelle la fonction "csrf" pour obtenir un jeton CSRF, 
 * ce qui est une mesure de sécurité pour prévenir les attaques CSRF. 
 * En cas de succès, la déconnexion de l'utilisateur est effectuée. 
 * En cas d'erreur lors de la requête, l'erreur est renvoyée.
 */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "../config/axios/configAxios";

const csrf = () => myAxios.get("sanctum/csrf-cookie");

const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await csrf();
    await myAxios.post("logout");
  } catch (error) {
    // console.log(error);
    throw error;
  }
});

export default logout;