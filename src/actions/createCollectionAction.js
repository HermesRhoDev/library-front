import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios } from "../config/axios/configAxios";

/**
 * Ce code définit une action asynchrone createCollection en utilisant Redux Toolkit. 
 * Cette action effectue une requête POST pour créer une nouvelle collection de livres, en 
 * utilisant une instance Axios préconfigurée (myAxios dans le dossier config), 
 * et gère les éventuelles erreurs qui pourraient survenir.
 */

const csrf = () => myAxios.get("sanctum/csrf-cookie");

const createCollection = createAsyncThunk(
  "collection/addBookToCollection",
  async ({ name, user_id }) => {
    try {
      await csrf();
      const response = await myAxios.post("api/collection/store", {
        name,
        user_id,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export default createCollection;