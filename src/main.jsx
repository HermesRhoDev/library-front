import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import { PersistGate } from "redux-persist/integration/react";
import { fetchCurrentUser } from "./actions/fetchCurrentUser";
import logout from "./actions/logoutAction";
import "./assets/styles/index.css";
import "./assets/styles/styles.css";
import { Accueil } from "./pages/accueil";
import { BookDetails } from "./pages/bookDetails";
import { CollectionDetails } from "./pages/collectionDetails";
import { MyCollections } from "./pages/collections";
import { Community } from "./pages/community";
import { Error404 } from "./pages/error404";
import { Favorites } from "./pages/favorites";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { MyAccount } from "./pages/myAccount";
import SearchResults from "./pages/searchResults";
import { Signup } from "./pages/signup";
import { SignupConfirmation } from "./pages/signupConfirmation";
import { persistor, store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404 />,
  },
  {
    path: "/inscription",
    element: <Signup />,
  },
  {
    path: "/inscription-confirmation",
    element: <SignupConfirmation />,
  },
  {
    path: "/connexion",
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
    element: <MyCollections />,
  },
  {
    path: "/accueil/livre-detail/:id",
    element: <BookDetails />,
  },
  {
    path: "/mescollections/collection/:id",
    element: <CollectionDetails />,
  },
  {
    path: "/communaute",
    element: <Community />,
  },
  {
    path: "/resultats-de-recherche",
    element: <SearchResults />,
  },
  {
    path: "/moncompte",
    element: <MyAccount />,
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
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
