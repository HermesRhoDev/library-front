// REACT IMPORT \\
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/styles/index.css";
import { Test } from "./pages/test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Test />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
