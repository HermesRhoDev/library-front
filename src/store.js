/**
 * Les reducers spécifiques à chaque partie de l'application (comme les livres Google, 
 * l'authentification et les collections) sont combinés en un seul rootReducer à l'aide de la fonction combineReducers.
 * 
 * Redux Persist est configuré avec une clé de stockage (key) et un type de stockage (storage). 
 * Le stockage persistant est configuré pour utiliser le localStorage du navigateur.
 * 
 * Un reducer persistant est créé en utilisant Redux Persist avec le persistConfig et le rootReducer.
 * 
 * Le store Redux est configuré à l'aide de configureStore de Redux Toolkit, en spécifiant le reducer persistant. 
 * De plus, le middleware Redux Thunk est ajouté pour gérer les actions asynchrones.
 * 
 * Un persistor est créé pour le store Redux à l'aide de persistStore, 
 * ce qui permet de stocker de manière persistante l'état de l'application. 
 * Le persistor peut être utilisé pour réhydrater le store avec les données persistantes au chargement de l'application.
 */

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { googleBookApiReducer } from "./config/redux/reduxGoogleBook";
import { authReducer } from "./config/redux/reduxAuth";
import { collectionReducer } from "./config/redux/reduxCollection";

const rootReducer = combineReducers({
  googleBookApi: googleBookApiReducer,
  auth: authReducer,
  collection: collectionReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
