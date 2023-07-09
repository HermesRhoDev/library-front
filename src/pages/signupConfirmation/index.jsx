import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  selectRegisterSuccess,
  selectUserInfo,
} from "../../config/redux/reduxAuth";

export const SignupConfirmation = () => {
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const registrationSucced = useSelector(selectRegisterSuccess);

  useEffect(() => {
    if (userInfo) {
      navigate("/accueil");
    }

    if (registrationSucced != true) {
      navigate("/inscription");
    }
  }, [userInfo, registrationSucced]);

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-10">
      <div className="text-center px-5">
        <h1 className="text-primary uppercase font-bold text-6xl">MERCI</h1>
        <br />
        <p className="text-primary font-medium">
          Votre inscription est maintenant validé, vous pouvez vous connecter en
          cliquant sur le bouton ci-dessous :)
        </p>
      </div>

      <Link
        to="/connexion"
        className="rounded-full bg-primary text-secondary uppercase px-5 py-2 font-bold"
      >
        Me Connecter
      </Link>
    </div>
  );
};
