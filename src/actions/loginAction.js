/**
 * Ce code définit une action asynchrone "login" en utilisant Redux Toolkit. 
 * Cette action effectue une requête de connexion en utilisant Axios (via l'objet "myAxios") 
 * vers l'endpoint "login". Avant la requête, elle appelle une fonction "csrf" 
 * pour obtenir un jeton CSRF, ce qui est une pratique courante pour sécuriser les requêtes. 
 * En cas de succès, elle renvoie les données de la réponse HTTP. 
 * En cas d'erreur, elle gère les erreurs spécifiques, 
 * notamment les erreurs de validation (statut 422) en lançant une exception 
 * avec le message d'erreur de la réponse. 
 * Les autres erreurs sont propagées telles quelles.
 */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "../config/axios/configAxios.js";

const csrf = () => myAxios.get("sanctum/csrf-cookie");

const login = createAsyncThunk("auth/login", async ({ email, password }) => {
  try {
    await csrf();
    const response = await myAxios.post("login", {
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