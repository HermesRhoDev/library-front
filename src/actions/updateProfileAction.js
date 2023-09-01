/**
 * Ce code crée une action asynchrone "updateProfile" en utilisant Redux Toolkit. 
 * Cette action gère la mise à jour du profil d'un utilisateur en effectuant une 
 * requête PUT vers l'endpoint "api/profile/update" en utilisant Axios (objet myAxios). Avant 
 * la requête, elle s'assure d'obtenir un jeton CSRF en appelant la fonction 
 * "csrf-cookie". En cas de succès, elle renvoie les données de la réponse HTTP. 
 * En cas d'erreur lors de la requête, elle gère les erreurs spécifiques à Axios, 
 * en récupérant le message d'erreur depuis la réponse de l'erreur si possible. 
 * Les autres erreurs sont propagées telles quelles.
 */

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