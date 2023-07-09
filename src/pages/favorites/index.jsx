import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FillHeart } from "../../assets/svg/fillHeart";
import { StrokeHeart } from "../../assets/svg/strokeHeart";
import Layout from "../../components/layout";
import { selectUserInfo } from "../../config/redux/reduxAuth";
import { selectFetchCollections } from "../../config/redux/reduxCollection";

export const Favorites = () => {
  const collections = useSelector(selectFetchCollections);
  const favoriteCollection = collections.find(
    (collection) => collection.name === "Favoris"
  );
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  return (
    <Layout>
      {collections &&
      favoriteCollection &&
      favoriteCollection.books.length > 0 ? (
        <div className="w-full grid 2xl:grid-cols-10 max-[768px]:grid-cols-3 grid-cols-5 gap-y-10 justify-items-center">
          {favoriteCollection.books.map((favoriteBook) => {
            let id = favoriteBook.id;
            let title = favoriteBook.title;
            let cover_link =
              favoriteBook.cover_link ??
              "https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png";
            const isFavoris = favoriteCollection?.books.some(
              (book) => book.id === id
            );

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
                  <Link to={"/accueil/livre-detail/" + id}>
                    <img
                      className="h-full rounded-lg w-32 cursor-pointer"
                      src={cover_link}
                      alt={title}
                      onClick={() => console.log("googleBookClick")}
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
        <div className="w-full h-full flex justify-center items-center title-dark text-2xl">
          AUCUN LIVRE FAVORIS ACTUELLEMENT
        </div>
      )}
    </Layout>
  );
};
