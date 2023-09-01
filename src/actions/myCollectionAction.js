/**
 * Ce code crée une action asynchrone "fetchCollections" en utilisant Redux Toolkit. 
 * Cette action a pour but de récupérer les collections de données en effectuant 
 * une requête GET vers l'endpoint "api/mycollections" en utilisant Axios. 
 * Avant la requête, elle s'assure d'obtenir un jeton CSRF en appelant 
 * la fonction "csrf-cookie". En cas de succès, elle renvoie les données 
 * de la réponse HTTP. En cas d'erreur lors de la requête, 
 * l'erreur est affichée dans la console, et 
 * l'action échoue avec un message d'erreur qui est renvoyé en utilisant 
 * la fonction "rejectWithValue".
 */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "../config/axios/configAxios";

export const fetchCollections = createAsyncThunk(
  "collection/fetchCollections",
  async (_, { rejectWithValue }) => {
    try {
      await myAxios.get("sanctum/csrf-cookie");
      const response = await myAxios.get("api/mycollections");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);