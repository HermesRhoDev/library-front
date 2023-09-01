/**
 * Ce code crée un slice Redux nommé "googleBookApiSlice" qui gère l'état lié à la récupération 
 * de livres depuis l'API Google Books. Il définit un état initial avec des propriétés telles 
 * que "books" (contenant les données des livres récupérés depuis l'API), "isLoading" 
 * (indiquant si une action est en cours d'exécution) et "hasError" 
 * (indiquant si une erreur s'est produite). 
 * Le slice gère l'action asynchrone "getBooks" en utilisant les reducers générés 
 * automatiquement par Redux Toolkit pour mettre à jour l'état en fonction du statut 
 * de cette action. Il exporte également des sélecteurs pour accéder à des parties 
 * spécifiques de l'état dans les composants, et le reducer du slice pour être utilisé 
 * dans le store Redux de l'application.
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosGoogleBookApi } from "../axios/configAxiosGoogle";

export const getBooks = createAsyncThunk("googleBookApi/getBooks", async () => {
  try {
    const response = await axiosGoogleBookApi.get();
    return response.data.items;
  } catch (error) {
    console.log(error);
  }
});

const googleBookApiSlice = createSlice({
  name: "googleBookApi",
  initialState: {
    books: {},
    isLoading: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export const selectBooks = (state) => state.googleBookApi.books;
export const selectLoadingState = (state) => state.googleBookApi.isLoading;
export const selectErrorState = (state) => state.googleBookApi.hasError;

export const googleBookApiReducer = googleBookApiSlice.reducer;