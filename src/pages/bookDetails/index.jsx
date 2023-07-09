import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FillHeart } from "../../assets/svg/fillHeart";
import Layout from "../../components/layout";
import { myAxios } from "../../config/axios/configAxios";
import { selectUserInfo } from "../../config/redux/reduxAuth";
import { selectFetchCollections } from "../../config/redux/reduxCollection";
import { TabTitle } from "../../utils/tabtitle";
import { toastConfig } from "../../utils/toast/config";

export const BookDetails = () => {
  TabTitle("Consultation - In The Pocket");

  let { id } = useParams();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const [bookDetails, setBookDetails] = useState(null);
  const collections = useSelector(selectFetchCollections);
  const [collectionFavoris, setCollectionFavoris] = useState(null);
  const [collectionsLogged, setCollectionsLogged] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [selectedCollection, setSelectedCollection] = useState(null);
  const [previousCollections, setPreviousCollections] = useState([]);

  const getBookDetails = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}`,
        {
          headers: {
            "Content-Type": "text/json",
          },
        }
      );
      setBookDetails(response.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/connexion");
    }
    getBookDetails();
  }, [userInfo]);

  useEffect(() => {
    if (userInfo && collections && !collectionsLogged) {
      setCollectionsLogged(true);

      const favoris = collections.find(
        (collection) => collection.name === "Favoris"
      )?.id;

      setCollectionFavoris(favoris);
    }
  }, [userInfo, collections, collectionsLogged]);

  useEffect(() => {
    if (userInfo && collections && collectionsLogged) {
      setPreviousCollections([...collections]);
    }
  }, [userInfo, collections, collectionsLogged]);

  const isFavoris =
    collectionFavoris &&
    collectionsLogged &&
    collections
      .find((collection) => collection.id === collectionFavoris)
      ?.books.some((book) => book.id === id);

  const handleAddToCollection = (collectionId) => {
    handleConfirmAddToCollection(collectionId);
    setShowModal(true);
  };

  const handleConfirmAddToCollection = async (collectionId) => {
    try {
      const bookData = {
        id: bookDetails.id,
        title: bookDetails.volumeInfo.title,
        pageCount: bookDetails.volumeInfo?.pageCount || "information manquante",
        authors:
          bookDetails.volumeInfo.authors?.length > 0
            ? bookDetails.volumeInfo.authors[0]
            : "information manquante",
        categories:
          bookDetails.volumeInfo.categories?.length > 0
            ? bookDetails.volumeInfo.categories[0]
            : "information manquante",
        cover_link:
          bookDetails.volumeInfo.imageLinks?.thumbnail ||
          "https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png",
        summary: bookDetails.volumeInfo.description || "information manquante",
      };

      await myAxios.post(`api/collection/${collectionId}/add-book`, bookData);
      setShowModal(false);
      toast.success("Le livre a bien été ajouté à la collection", {
        toastConfig,
      });
    } catch (error) {
      toast.error("Erreur, déjà dans cette liste", { toastConfig });
      throw error;
    }
  };

  return (
    <>
      <Layout>
        {bookDetails ? (
          <div className="w-full h-full flex flex-row max-[768px]:flex-col">
            <div className="w-1/2 h-full max-[768px]:w-full">
              <div className="w-full h-fit flex flex-row p-5 max-[768px]:flex-col max-[768px]:h-fit max-[768px]:items-center">
                <img
                  className="rounded-lg w-32 h-52"
                  src={
                    bookDetails.volumeInfo.imageLinks
                      ? bookDetails.volumeInfo.imageLinks.thumbnail
                      : "https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png"
                  }
                  alt={bookDetails.volumeInfo.title}
                  loading="lazy"
                />
                <div className="flex-1 px-2">
                  <h1>
                    <b>Titre : </b>
                    {bookDetails.volumeInfo.title}
                  </h1>
                  <h2>
                    <b>Catégorie(s) : </b>
                    {bookDetails.volumeInfo.categories
                      ? bookDetails.volumeInfo.categories[0]
                      : "Aucune"}
                  </h2>
                  <h3>
                    <b>{bookDetails.volumeInfo.pageCount} pages</b>
                  </h3>
                  <h4>
                    <b>Auteur(s) : </b>
                    {bookDetails.volumeInfo.authors
                      ? bookDetails.volumeInfo.authors[0]
                      : "information manquante"}
                  </h4>
                  <h5>
                    <b>Notes : </b> XX / 10
                  </h5>
                  {isFavoris ? (
                    <>
                      <br />
                      <FillHeart />
                    </>
                  ) : null}
                  <br />
                  <button
                    className="bg-primary text-secondary py-2 px-5 rounded-lg"
                    onClick={() => setShowModal(true)}
                  >
                    Ajouter à une collection ?
                  </button>
                </div>
              </div>
              <div className="w-full h-2/3 p-5 overflow-y-auto">
                <div
                  dangerouslySetInnerHTML={{
                    __html: bookDetails.volumeInfo.description,
                  }}
                />
              </div>
            </div>
            <div className="w-1/2 h-full p-5 max-[768px]:w-full max-[768px]:mt-24 flex flex-col justify-center items-center">
              <p className="font-bold text-2xl">Les commentaires arrivent !</p>
              <p className="font-medium text-lg">Ils sont en cours de construction ;)</p>
            </div>
          </div>
        ) : null}
      </Layout>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <div className="w-full h-full flex items-center justify-center flex-col gap-5">
              <h1 className="text-3xl font-semibold max-[768px]:text-xl">
                Sélectionnez une collection
              </h1>
              <div className="grid grid-cols-2 gap-4 max-[768px]:grid-cols-1">
                {previousCollections &&
                  previousCollections.map((collection) => {
                    const handleClick = () => {
                      handleConfirmAddToCollection(collection.id);
                    };

                    return (
                      <button
                        key={collection.id}
                        className="bg-primary text-secondary px-4 py-2 rounded-lg"
                        onClick={handleClick}
                      >
                        {collection.name}
                      </button>
                    );
                  })}
              </div>
              <button
                className="bg-gray-200 px-4 py-2 rounded mt-4"
                onClick={() => setShowModal(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
