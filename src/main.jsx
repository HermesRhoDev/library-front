import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { fetchCurrentUser } from "./actions/fetchCurrentUser";
import logout from "./actions/logoutAction";
import "./assets/styles/index.css";
import "./assets/styles/styles.css";
import "react-tooltip/dist/react-tooltip.css";
import { Accueil } from "./pages/accueil";
import { Error404 } from "./pages/error404";
import { Favorites } from "./pages/favoris";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { persistor, store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404 />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/accueil",
    element: <Accueil />,
  },
  {
    path: "/mesfavoris",
    element: <Favorites />,
  },
  {
    path: "/mescollections",
    element: <Favorites />,
  },
]);

const checkAuthentication = async () => {
  try {
    await store.dispatch(fetchCurrentUser());
  } catch (error) {
    await store.dispatch(logout());
  }
};

checkAuthentication();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
