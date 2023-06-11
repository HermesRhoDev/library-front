import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import logout from "../../actions/logoutAction";
import { ArrowRightOnRectangle } from "../../assets/svg/arrowRightOnRectangle";
import { FillHeart } from "../../assets/svg/fillHeart";
import { HamburgerSVG } from "../../assets/svg/hamburger";
import { TabTitle } from "../../utils/tabtitle";

export default function Layout({ children }) {
  TabTitle("Favoris - In The Pocket");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col">
        <div className="w-full p-5 bg-primary h-fit max-[640px]:hidden flex flex-row justify-between items-center">
          <div
            className="flex gap-4 items-center hover:cursor-pointer"
            onClick={() => navigate("/accueil")}
          >
            <img
              src="src/assets/images/inthepocket_white_logo.png"
              alt=""
              className="w-20 h-auto"
            />
            <h1 className="uppercase title-light text-xl">IN THE POCKET</h1>
          </div>
          <ul className="flex gap-4 items-center">
            <li className="bg-secondary rounded-full p-2">
              <Link to="/mesfavoris">
                <FillHeart />
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
            >
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
              <ArrowRightOnRectangle
                onClick={() => dispatch(logout())}
                data-tooltip-id="logoutTooltip"
              />
            </li>
          </ul>
        </div>

        <div className="w-full h-16 bg-secondary flex items-center px-4">
          <button className="max-[640px]:block hidden">{HamburgerSVG()}</button>
          <ul className="w-full flex justify-around">
            <li>Filtre</li>
            <li>Filtre</li>
            <li>Filtre</li>
            <li>Filtre</li>
          </ul>
        </div>
      </div>

      <div className="w-full bg-secondary overflow-y-scroll h-full p-5">
        {children}
      </div>
    </div>
  );
}
