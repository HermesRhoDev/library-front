/**
 * Ce code crée une action asynchrone "register" en utilisant Redux Toolkit. 
 * Cette action gère le processus d'inscription d'un utilisateur en effectuant 
 * une requête POST vers l'endpoint "register" en utilisant Axios (l'objet myAxios). Avant la requête, 
 * elle s'assure d'obtenir un jeton CSRF en appelant la fonction "csrf-cookie". 
 * En cas de succès, elle renvoie les données de la réponse HTTP. En cas d'erreur 
 * lors de la requête, elle gère les erreurs spécifiques à Axios, en récupérant le message 
 * d'erreur depuis la réponse de l'erreur si possible. Les autres erreurs sont propagées telles quelles.
 */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { myAxios } from "../config/axios/configAxios";

const csrf = () => myAxios.get("sanctum/csrf-cookie");

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
      const response = await myAxios.post("register", {
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

export default register;
