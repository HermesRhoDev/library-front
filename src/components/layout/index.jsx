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
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=0&maxResults=40`
      );
      const data = await response.json();

      navigate("/resultats-de-recherche", { state: { searchData: data } });
    } catch (error) {
      throw error;
    }

    handleSearchModalToggle();
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col">
        <div className="w-full p-5 bg-primary h-fit max-[768px]:hidden flex flex-row justify-between items-center">
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
                to="/moncompte"
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

        <div className="w-full h-16 bg-secondary items-center px-4 max-[768px]:block hidden">
          <ul className="flex gap-2 items-center justify-center max-[376px]:gap-0">
            <li className="bg-secondary rounded-full p-2 hover:cursor-pointer">
              <Link to="/accueil">
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
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </Link>
            </li>
            <li
              className="bg-secondary rounded-full p-2 hover:cursor-pointer"
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
            </li>
            <li
              className="bg-secondary rounded-full p-2 hover:cursor-pointer"
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
            </li>
            <li
              className="bg-secondary rounded-full p-2 hover:cursor-pointer"
              onClick={handleModalToggle}
            >
              <SquarePlus />
            </li>
            <li
              className="bg-secondary rounded-full p-2 hover:cursor-pointer"
              onClick={() => navigate("/mesfavoris")}
            >
              <FillHeart />
            </li>
            <li>
              <Link
                to="/mescollections"
                className="bg-secondary px-4 py-2 rounded-full font-bold max-[768px]:text-xs"
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
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>
              </Link>
            </li>
            <li className="max-[768px]:text-center px-4 py-2">
              <Link
                to="/moncompte"
                className="bg-secondary rounded-full font-bold max-[768px]:text-xs"
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
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
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
      </div>

      <div className="w-full bg-secondary overflow-y-scroll h-full p-5">
        {children}
      </div>

      {showModal && <Modal />}

      {showSearchModal && (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-screen bg-primary bg-opacity-80 w-full">
          <div className="p-5 w-full text-center">
            <h1 className="text-xl text-center font-semibold mb-5 text-secondary uppercase">
              Rechercher un livre ?
            </h1>
            <Formik initialValues={{ searchQuery: "" }} onSubmit={handleSearch}>
              <Form>
                <Field
                  type="text"
                  name="searchQuery"
                  placeholder="Exemple de recherche - tome 1 - titre - auteur"
                  className="py-3 px-6 w-3/4 rounded-full focus:outline-none text-lg font-medium"
                />
                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    className="bg-secondary text-primary font-semibold px-4 py-2 rounded-full mr-2"
                    onClick={handleSearchModalToggle}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="bg-secondary text-primary font-semibold px-4 py-2 rounded-full"
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
