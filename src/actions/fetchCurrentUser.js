// Ce code utilise Redux Toolkit pour créer une action asynchrone nommée "fetchCurrentUser".
// Cette action effectue une requête HTTP GET à l'endpoint "api/user" en utilisant l'objet "myAxios"
// provenant du fichier de configuration "../config/axios/configAxios". Elle renvoie les données
// de la réponse HTTP en cas de succès, et en cas d'erreur, elle lance une exception avec le message
// d'erreur de la réponse HTTP.

import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "../config/axios/configAxios";

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async () => {
    try {
      const response = await myAxios.get("api/user");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
