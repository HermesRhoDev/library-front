import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import { myAxios } from "../../config/axios/configAxios";
import { selectUserInfo } from "../../config/redux/reduxAuth";

export const Community = () => {
  const [publicCollections, setPublicCollections] = useState([]);
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);

  const fetchPublicCollections = async () => {
    try {
      const response = await myAxios.get("/api/public-collections");
      setPublicCollections(response.data.collections);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/connexion");
    }
    fetchPublicCollections();
  }, [userInfo]);

  return (
    <Layout>
      <div className="h-full flex items-center justify-center">
        {publicCollections && publicCollections.length > 0 ? (
          publicCollections.map((publicCollection) => {
            return (
              <Fragment key={publicCollection.id}>
                <div className="w-44 h-36 relative bg-white shadow-lg rounded-lg">
                  <Link
                    to={"/mescollections/collection/" + publicCollection.id}
                  >
                    <div
                      style={{ overflowWrap: "anywhere" }}
                      className="uppercase font-bold max-w-full h-full text-center flex items-center justify-center"
                    >
                      {publicCollection.name}
                    </div>
                  </Link>
                </div>
              </Fragment>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="text-2xl uppercase">
              Pas de collection dans cet espace pour le moment
            </h1>
            <p className="text-lg text-center">
              Passer une de mes collections en public ?
            </p>
            <Link
              to="/mescollections"
              className="px-5 py-2 bg-primary text-secondary rounded-full uppercase font-semibold"
            >
              Mes collections
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};
