import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUserInfo } from "../../config/redux/reduxAuth";

export const Home = () => {
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (userInfo) {
      navigate("/accueil");
    }
  }, [userInfo]);

  return (
    <div className="flex flex-col h-screen bg-primary items-center justify-center gap-3">
      <img
        src="/src/assets/images/inthepocket_white_logo.png"
        alt="In The Pocket White Logo"
        className="w-32"
      />
      <h1 className="text-3xl title-light">IN THE POCKET</h1>
      <p className="text-xl max-[320px]:text-lg max-[320px]:px-1 text-secondary text-center px-4 italic">
        Votre bibliothèque à portée de main
      </p>
      <Link
        to="/connexion"
        className="px-6 py-4 bg-secondary text-primary font-bold uppercase"
      >
        COMMENCER
      </Link>
    </div>
  );
};
