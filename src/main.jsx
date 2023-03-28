// REACT IMPORT \\
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./assets/styles/index.css";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Test } from "./pages/test";
import { persistor, store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Test />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </>
);
