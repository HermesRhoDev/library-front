import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FillHeart } from "../../assets/svg/fillHeart";
import { StrokeHeart } from "../../assets/svg/strokeHeart";
import Layout from "../../components/layout";
import { myAxios } from "../../config/axios/configAxios";
import { selectUserInfo } from "../../config/redux/reduxAuth";
import { TabTitle } from "../../utils/tabtitle";
import { toastConfig } from "../../utils/toast/config";

export const CollectionDetails = () => {
  TabTitle("Collection - In The Pocket");

  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const [collectionDetails, setCollectionDetails] = useState(null);
  const csrf = () => myAxios.get("sanctum/csrf-cookie");

  let { id } = useParams();

  const getCollectionDetails = async () => {
    try {
      await csrf();
      const response = await myAxios.get(`api/collection/${id}`);
      setCollectionDetails(response.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    getCollectionDetails();
  }, [userInfo]);

  const removeBookFromCollection = async (collectionId, bookId) => {
    try {
      await myAxios.delete(
        `api/collection/${collectionId}/remove-book/${bookId}`
      );

      toast.success("Livre supprimé de la collection avec succès", {
        toastConfig,
      });
    } catch (error) {
      toast.error("Erreur", { toastConfig });
      throw error;
    }
  };

  const handleRemoveBook = async (collectionId, bookId) => {
    await removeBookFromCollection(collectionId, bookId);
    await getCollectionDetails();
  };

  const isUserCollectionOwner =
    collectionDetails && userInfo && collectionDetails.user_id === userInfo.id;

  return (
    <Layout>
      {collectionDetails && collectionDetails.books.length > 0 ? (
        <div className="w-full grid 2xl:grid-cols-10 max-[768px]:grid-cols-3 grid-cols-5 gap-y-10 justify-items-center">
          {collectionDetails.books.map((book) => {
            let id = book.id;
            let title = book.title;
            let cover =
              book.cover_link ??
              "https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png";

            return (
              <div
                key={id}
                className="hover:scale-105 ease-linear duration-200"
              >
                <div className="h-52 shadow-xl w-fit flex flex-row relative rounded-lg">
                  <div className="absolute bg-white rounded-full p-1 shadow-lg -top-2 -left-2">
                    {collectionDetails.name === "Favoris" ? (
                      <FillHeart />
                    ) : (
                      <StrokeHeart />
                    )}
                  </div>

                  {/* ICI ON GERE LA SUPPRESSION DU LIVRE DE LA COLLECTION */}
                  {isUserCollectionOwner && (
                    <div
                      className="absolute bg-white rounded-full p-1 shadow-lg -top-2 -right-2 hover:cursor-pointer"
                      onClick={() =>
                        handleRemoveBook(collectionDetails.id, book.id)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}

                  {/* ///////////////////////////////////////////////////////////// */}

                  <Link to={"/accueil/livre-detail/" + id}>
                    <img
                      className="h-full rounded-lg w-32 cursor-pointer"
                      src={cover}
                      alt={title}
                    />
                  </Link>
                </div>
                <div
                  className="w-32 mt-2"
                  style={{
                    maxHeight: "3rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }}
                >
                  {title}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center flex-col gap-5">
          <h1 className="text-3xl font-semibold max-[768px]:text-xl">
            Cette collection ne contient pas de livres pour le moment
          </h1>
          <Link
            to={"/accueil"}
            className="rounded-full px-5 py-2 font-semibold uppercase text-secondary bg-primary"
          >
            En ajouter ?
          </Link>
        </div>
      )}
    </Layout>
  );
};
