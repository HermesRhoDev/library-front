import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleAddBookToFavorisAction } from "../../actions/handleAddBookToFavorisAction";
import { fetchCollections } from "../../actions/myCollectionAction";
import { removeBookFromFavoris } from "../../actions/removeBookFromFavoris";
import { FillHeart } from "../../assets/svg/fillHeart";
import { StrokeHeart } from "../../assets/svg/strokeHeart";
import Layout from "../../components/layout";
import { selectUserInfo } from "../../config/redux/reduxAuth";
import { selectFetchCollections } from "../../config/redux/reduxCollection";
import { TabTitle } from "../../utils/tabtitle";

export const Accueil = () => {
  TabTitle("Accueil - In The Pocket");

  const userInfo = useSelector(selectUserInfo);
  const collections = useSelector(selectFetchCollections);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [googleBooks, setGoogleBooks] = useState(null);
  const [collectionFavoris, setCollectionFavoris] = useState(null);
  const [collectionsLogged, setCollectionsLogged] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const getGoogleBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=$%7Bexample%7D&maxResults=40&startIndex=${startIndex}`
      );
      setGoogleBooks(response.data.items);
      setLoading(false);
      window.scrollTo(0, 0);
    } catch (error) {
      throw error;
    }
  };

  const loadMoreBooks = () => {
    setStartIndex((prevIndex) => prevIndex + 40);
  };

  const loadLessBooks = () => {
    setStartIndex((prevIndex) => prevIndex - 40);
  };

  useEffect(() => {
    if (startIndex >= 0) {
      getGoogleBooks();
    }
  }, [startIndex]);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchCollections());
      getGoogleBooks();
    } else {
      navigate("/connexion");
    }
  }, [userInfo, dispatch, navigate]);

  useEffect(() => {
    if (userInfo && collections && !collectionsLogged) {
      setCollectionsLogged(true);

      const favoris = collections.find(
        (collection) => collection.name === "Favoris"
      )?.id;

      setCollectionFavoris(favoris);
    }
  }, [userInfo, collections, collectionsLogged]);

  return (
    <Layout>
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="w-full grid 2xl:grid-cols-10 max-[768px]:grid-cols-2 grid-cols-5 gap-y-10 justify-items-center">
          {googleBooks
            ? googleBooks.map((googleBook) => {
                let id = googleBook.id;
                let title = googleBook["volumeInfo"]["title"];
                let cover_link =
                  googleBook["volumeInfo"]["imageLinks"]?.thumbnail ??
                  "https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png";

                const isFavoris =
                  collectionFavoris &&
                  collectionsLogged &&
                  collections
                    .find((collection) => collection.id === collectionFavoris)
                    ?.books.some((book) => book.id === id);

                return (
                  <div
                    key={id}
                    className="hover:scale-105 ease-linear duration-200"
                  >
                    <div className="h-52 shadow-xl w-fit flex flex-row relative rounded-lg">
                      <div className="absolute bg-white rounded-full p-1 shadow-lg -top-2 -left-2">
                        {isFavoris ? (
                          <FillHeart
                            onClick={() =>
                              removeBookFromFavoris(
                                id,
                                dispatch,
                                collectionFavoris
                              )
                            }
                          />
                        ) : (
                          <StrokeHeart
                            onClick={() =>
                              handleAddBookToFavorisAction(
                                googleBook,
                                dispatch,
                                collectionFavoris
                              )
                            }
                          />
                        )}
                      </div>
                      <Link to={"/accueil/livre-detail/" + id}>
                        <img
                          className="h-full rounded-lg w-32 cursor-pointer"
                          src={cover_link}
                          alt={title}
                          loading="lazy"
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
              })
            : null}
          {googleBooks && (
            <>
              {startIndex > 0 && (
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-primary text-white px-4 py-2 rounded-full"
                    onClick={loadLessBooks}
                  >
                    Retour
                  </button>
                </div>
              )}
              <div className="flex justify-center mt-4">
                <button
                  className="bg-primary text-white px-4 py-2 rounded-full"
                  onClick={loadMoreBooks}
                >
                  Charger plus
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Layout>
  );
};
