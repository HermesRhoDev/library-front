import React from "react";
import { Link } from "react-router-dom";
import { TabTitle } from "../../utils/tabtitle";

export const Error404 = () => {
  TabTitle("Erreur 404 - In The Pocket");

  return (
    <div className="h-screen bg-primary flex flex-col justify-center items-center gap-6">
      <h1 className="text-center text-4xl font-bold text-secondary">
        ERREUR 404
      </h1>
      <p className="text-center text-secondary p-3">
        La page que vous recherchez n'existe pas.
        <br />
        Vous pouvez cliquer sur le bouton ci-dessous pour retourner à l'accueil.
      </p>
      <Link to="/accueil" className="bg-secondary rounded-full px-5 py-2 font-semibold uppercase">
        RETOURNER VERS L'ACCUEIL
      </Link>
    </div>
  );
};
