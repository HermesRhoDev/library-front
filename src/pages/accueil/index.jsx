import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCollections } from "../../actions/myCollectionAction";
import { FillHeart } from "../../assets/svg/fillHeart";
import { StrokeHeart } from "../../assets/svg/strokeHeart";
import Layout from "../../components/layout";
import { axios } from "../../config/axios/configAxios";
import { axiosGoogleBookApi } from "../../config/axios/configAxiosGoogle";
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
  const [favorisCount, setFavorisCount] = useState(0);
  const [collectionsLogged, setCollectionsLogged] = useState(false);

  const getGoogleBooks = async () => {
    try {
      const response = await axiosGoogleBookApi.get();
      setGoogleBooks(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const csrf = () => axios.get("sanctum/csrf-cookie");

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchCollections());
      getGoogleBooks();
    } else {
      navigate("/login");
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

      const response = await axios.post(
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
      return response;
    } catch (error) {
      console.log(error);
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

      const response = await axios.delete(
        `/api/collection/${collectionFavoris}/remove-book/${bookId}`
      );
      dispatch(fetchCollections());
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="w-full grid 2xl:grid-cols-10 max-[768px]:grid-cols-3 grid-cols-5 gap-y-10 justify-items-center">
        {googleBooks
          ? googleBooks.map((googleBook) => {
              let id = googleBook.id;
              let title = googleBook["volumeInfo"]["title"];
              let cover_link =
                googleBook["volumeInfo"]["imageLinks"]["thumbnail"];

              const isFavoris =
                collectionFavoris &&
                collectionsLogged &&
                collections
                  .find((collection) => collection.id === collectionFavoris)
                  ?.books.some((book) => book.id === id);

              return (
                <div
                  key={id}
                  className="hover:scale-110 ease-linear duration-200"
                >
                  <div className="h-52 shadow-xl w-fit flex flex-row relative rounded-lg">
                    <div className="absolute bg-white rounded-full p-1 shadow-lg -top-2 -left-2">
                      {isFavoris ? (
                        <FillHeart onClick={() => removeBookFromFavoris(id)} />
                      ) : (
                        <StrokeHeart
                          onClick={() => handleImageClick(googleBook)}
                        />
                      )}
                    </div>
                    <img
                      className="h-full rounded-lg w-32 cursor-pointer"
                      src={cover_link}
                      alt={title}
                      onClick={() => console.log("googleBookClick")}
                    />
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
      </div>
    </Layout>
  );
};
