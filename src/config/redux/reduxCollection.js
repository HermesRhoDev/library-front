/**
 * Ce code crée un slice Redux nommé "collectionSlice" qui gère l'état lié aux collections d'éléments 
 * dans l'application. Il définit un état initial avec des propriétés telles que "collectionInfo" 
 * (contenant les informations sur la collection), "isLoading" (indiquant si une action est 
 * en cours d'exécution), "hasError" (indiquant si une erreur s'est produite), et "success" 
 * (indiquant si une action a réussi avec succès).Le slice gère les actions de récupération 
 * des collections et de création de collection en utilisant les reducers générés automatiquement 
 * par Redux Toolkit pour mettre à jour l'état en fonction du statut de ces actions.
 * Enfin, le code exporte des sélecteurs qui permettent d'accéder à des parties spécifiques 
 * de l'état dans les composants, et le reducer du slice pour être utilisé 
 * dans le store Redux de l'application.
 */

import { createSlice } from "@reduxjs/toolkit";
import createCollection from "../../actions/createCollectionAction";
import { fetchCollections } from "../../actions/myCollectionAction";

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    collectionInfo: null,
    isLoading: false,
    hasError: false,
    success: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.collectionInfo = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(createCollection.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        state.success = true;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(createCollection.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export const selectFetchCollections = (state) =>
  state.collection.collectionInfo;
export const selectLoadingState = (state) => state.collection.isLoading;
export const selectErrorState = (state) => state.collection.hasError;
export const selectCollectionSuccess = (state) => state.collection.success;

export const collectionReducer = collectionSlice.reducer;
