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

  const handleModalToggle = () => {
    setShowModal(!showModal);
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
              className="bg-secondary rounded-full p-2"
              data-tooltip-id="addCollectionTooltip"
              onClick={handleModalToggle}
            >
              <Link to="#">
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
              </Link>
            </li>
            <li
              className="bg-secondary rounded-full p-2"
              data-tooltip-id="myFavoritesTooltip"
            >
              <Link to="/mesfavoris">
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
              </Link>
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
          <ul className="w-full flex justify-around">
            <li>Filtre</li>
            <li>Filtre</li>
            <li>Filtre</li>
            <li>Filtre</li>
          </ul>
        </div> */}
      </div>

      <div className="w-full bg-secondary overflow-y-scroll h-full p-5">
        {children}
      </div>

      {showModal && <Modal />}
    </div>
  );
}
