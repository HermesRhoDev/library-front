import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchCollections } from "../../actions/myCollectionAction";
import { FillHeart } from "../../assets/svg/fillHeart";
import { StrokeHeart } from "../../assets/svg/strokeHeart";
import Layout from "../../components/layout";
import { myAxios } from "../../config/axios/configAxios";
import { selectUserInfo } from "../../config/redux/reduxAuth";
import { selectFetchCollections } from "../../config/redux/reduxCollection";
import { TabTitle } from "../../utils/tabtitle";
import { toastConfig } from "../../utils/toast/config";

export const Accueil = () => {
  TabTitle("Accueil - In The Pocket");

  const userInfo = useSelector(selectUserInfo);
  const collections = useSelector(selectFetchCollections);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [googleBooks, setGoogleBooks] = useState(null);
  const [collectionFavoris, setCollectionFavoris] = useState(null);
  const [favorisCount, setFavorisCount] = useState(0);
  const [collectionsLogged, setCollectionsLogged] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const getGoogleBooks = async () => {
    try {
      setLoading(true); // Définit "loading" sur true pendant la récupération des livres
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=$%7Bexample%7D&maxResults=40&startIndex=${startIndex}`
      );
      setGoogleBooks(response.data.items);
      setLoading(false); // Définit "loading" sur false une fois les livres récupérés
      window.scrollTo(0, 0); // Redirige vers le haut de la page
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

  const csrf = () => myAxios.get("sanctum/csrf-cookie");

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

      const favorisCollection = collections.find(
        (collection) => collection.id === favoris
      );

      if (favorisCollection) {
        setFavorisCount(favorisCollection.books.length);
      }
    }
  }, [userInfo, collections, collectionsLogged]);

  const addBookToFavoris = async (googleBookInfo) => {
    const { id, title, pageCount, authors, categories, cover_link, summary } =
      googleBookInfo;

    try {
      await csrf();

      const response = await myAxios.post(
        `/api/collection/${collectionFavoris}/add-book`,
        {
          id,
          title,
          pageCount,
          authors,
          categories,
          cover_link,
          summary,
        }
      );
      dispatch(fetchCollections());
      toast.success("Livre ajouté aux favoris !", { toastConfig });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleImageClick = (googleBook) => {
    if (googleBook && googleBook.volumeInfo) {
      const { title, imageLinks, description } = googleBook.volumeInfo;
      const id = googleBook.id;
      const categories = googleBook["volumeInfo"]["categories"]?.shift();
      const authors = googleBook["volumeInfo"]["authors"]?.shift();
      const pageCount = googleBook.volumeInfo.pageCount || 0;

      addBookToFavoris({
        id,
        title,
        pageCount,
        authors,
        categories,
        cover_link: imageLinks && imageLinks.thumbnail,
        summary: description,
      });
    }
  };

  const removeBookFromFavoris = async (bookId) => {
    try {
      await csrf();

      const response = await myAxios.delete(
        `/api/collection/${collectionFavoris}/remove-book/${bookId}`
      );
      dispatch(fetchCollections());
      toast.success("Livre retiré des favoris !", { toastConfig });
      return response;
    } catch (error) {
      throw error;
    }
  };

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
                            onClick={() => removeBookFromFavoris(id)}
                          />
                        ) : (
                          <StrokeHeart
                            onClick={() => handleImageClick(googleBook)}
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
                    className="bg-primary text-white px-4 py-2 rounded"
                    onClick={loadLessBooks}
                  >
                    Retour
                  </button>
                </div>
              )}
              <div className="flex justify-center mt-4">
                <button
                  className="bg-primary text-white px-4 py-2 rounded"
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
