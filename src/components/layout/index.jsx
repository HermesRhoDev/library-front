import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import logout from "../../actions/logoutAction";
import { ArrowRightOnRectangle } from "../../assets/svg/arrowRightOnRectangle";
import { FillHeart } from "../../assets/svg/fillHeart";
import { HamburgerSVG } from "../../assets/svg/hamburger";
import { SquarePlus } from "../../assets/svg/squarePlus";
import { toastConfig } from "../../utils/toast/config";
import { Modal } from "../modal";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleSearchModalToggle = () => {
    setShowSearchModal(!showSearchModal);
  };

  useEffect(() => {
    const handleModalHide = (event) => {
      const target = event.target;
      const isModalHideButton = target.dataset.modalHide === "defaultModal";

      if (isModalHideButton) {
        setShowModal(false);
      }
    };

    document.addEventListener("click", handleModalHide);

    return () => {
      document.removeEventListener("click", handleModalHide);
    };
  }, []);

  const handleSearch = async (values) => {
    const searchQuery = values.searchQuery.trim();
    if (searchQuery === "") {
      return;
    }

    try {
      // Effectuer la requête de recherche ici
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=0&maxResults=40`
      );
      const data = await response.json();

      // Rediriger vers le composant des résultats de recherche avec les données de recherche
      navigate("/resultats-de-recherche", { state: { searchData: data } });
    } catch (error) {
      console.error(error);
    }

    handleSearchModalToggle();
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col">
        <div className="w-full p-5 bg-primary h-fit max-[640px]:hidden flex flex-row justify-between items-center">
          <div
            className="flex gap-4 items-center hover:cursor-pointer"
            onClick={() => navigate("/accueil")}
          >
            <img
              src="/src/assets/images/inthepocket_white_logo.png"
              alt=""
              className="w-20 h-auto"
            />
            <h1 className="uppercase title-light text-xl">IN THE POCKET</h1>
          </div>
          <ul className="flex gap-4 items-center">
            <li
              className="bg-secondary rounded-full p-2 hover:cursor-pointer"
              data-tooltip-id="searchTooltip"
              onClick={handleSearchModalToggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <Tooltip
                id="searchTooltip"
                place="bottom"
                style={{
                  backgroundColor: "#f2f4f5",
                  color: "#231f20",
                  fontSize: "small",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Recherche
              </Tooltip>
            </li>
            <li
              className="bg-secondary rounded-full p-2 hover:cursor-pointer"
              data-tooltip-id="communityTooltip"
              onClick={() => navigate("/communaute")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
              <Tooltip
                id="communityTooltip"
                place="bottom"
                style={{
                  backgroundColor: "#f2f4f5",
                  color: "#231f20",
                  fontSize: "small",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Communauté
              </Tooltip>
            </li>
            <li
              className="bg-secondary rounded-full p-2 hover:cursor-pointer"
              data-tooltip-id="addCollectionTooltip"
              onClick={handleModalToggle}
            >
              <SquarePlus />
              <Tooltip
                id="addCollectionTooltip"
                place="bottom"
                style={{
                  backgroundColor: "#f2f4f5",
                  color: "#231f20",
                  fontSize: "small",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Créer une collection
              </Tooltip>
            </li>
            <li
              className="bg-secondary rounded-full p-2 hover:cursor-pointer"
              data-tooltip-id="myFavoritesTooltip"
              onClick={() => navigate("/mesfavoris")}
            >
              <FillHeart />
              <Tooltip
                id="myFavoritesTooltip"
                place="bottom"
                style={{
                  backgroundColor: "#f2f4f5",
                  color: "#231f20",
                  fontSize: "small",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Mes favoris
              </Tooltip>
            </li>
            <li>
              <Link
                to="/mescollections"
                className="bg-secondary px-4 py-2 rounded-full font-bold"
              >
                MES COLLECTIONS
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="bg-secondary px-4 py-2 rounded-full font-bold"
              >
                MON COMPTE
              </Link>
            </li>
            <li
              className="bg-secondary rounded-full p-2 hover:cursor-pointer"
              data-tooltip-id="logoutTooltip"
              onClick={() => {
                dispatch(logout());
                toast.success("Déconnecté !", { toastConfig });
              }}
            >
              <ArrowRightOnRectangle data-tooltip-id="logoutTooltip" />
              <Tooltip
                id="logoutTooltip"
                place="bottom"
                style={{
                  backgroundColor: "#f2f4f5",
                  color: "#231f20",
                  fontSize: "small",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Déconnexion
              </Tooltip>
            </li>
          </ul>
        </div>

        {/* <div className="w-full h-16 bg-secondary flex items-center px-4">
          <button className="max-[640px]:block hidden">{HamburgerSVG()}</button>
        </div> */}
      </div>

      <div className="w-full bg-secondary overflow-y-scroll h-full p-5">
        {children}
      </div>

      {showModal && <Modal />}

      {showSearchModal && (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-screen bg-primary bg-opacity-70">
          <div className="p-5">
            <h1 className="text-xl font-semibold mb-5">Recherche de livres</h1>
            <Formik initialValues={{ searchQuery: "" }} onSubmit={handleSearch}>
              <Form>
                <Field
                  type="text"
                  name="searchQuery"
                  placeholder="Rechercher un livre"
                  className="rounded-md py-2 px-4 w-full border-primary border focus:outline-none"
                />
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    className="bg-gray-200 px-4 py-2 rounded mr-2"
                    onClick={handleSearchModalToggle}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded"
                  >
                    Rechercher
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}
