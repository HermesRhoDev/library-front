import { configureStore } from "@reduxjs/toolkit";
import { googleBookApiReducer } from "./config/redux/redux";
import { authReducer } from "./config/redux/reduxAuth";

export const store = configureStore({
  reducer: {
    googleBookApi: googleBookApiReducer,
    auth: authReducer
  },
});
