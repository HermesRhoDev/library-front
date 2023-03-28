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
