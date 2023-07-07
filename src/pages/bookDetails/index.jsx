import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FillHeart } from "../../assets/svg/fillHeart";
import Layout from "../../components/layout";
import { selectUserInfo } from "../../config/redux/reduxAuth";
import { selectFetchCollections } from "../../config/redux/reduxCollection";
import { TabTitle } from "../../utils/tabtitle";

export const BookDetails = () => {
  TabTitle("Consultation - In The Pocket");

  let { id } = useParams();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const [bookDetails, setBookDetails] = useState(null);
  const collections = useSelector(selectFetchCollections);
  const [collectionFavoris, setCollectionFavoris] = useState(null);
  const [collectionsLogged, setCollectionsLogged] = useState(false);

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
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
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

  const isFavoris =
    collectionFavoris &&
    collectionsLogged &&
    collections
      .find((collection) => collection.id === collectionFavoris)
      ?.books.some((book) => book.id === id);

  return (
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
                    : ""
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
                <button className="bg-primary text-secondary py-2 px-5 rounded-lg">
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
          <div className="w-1/2 h-full p-5 max-[768px]:w-full max-[768px]:mt-24">

          </div>
        </div>
      ) : null}
    </Layout>
  );
};
