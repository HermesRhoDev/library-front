import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import { selectUserInfo } from "../../config/redux/reduxAuth";

const SearchResults = () => {
  const location = useLocation();
  const { searchData } = location.state;
  const userInfo = useSelector(selectUserInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/connexion");
    }
  }, [userInfo]);

  return (
    <Layout>
      <div className="w-full grid 2xl:grid-cols-10 max-[768px]:grid-cols-2 grid-cols-5 gap-y-10 justify-items-center">
        {searchData
          ? searchData.items.map((item) => {
              let cover_link =
                item["volumeInfo"]["imageLinks"]?.thumbnail ??
                "https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png";

              return (
                <div
                  key={item.id}
                  className="hover:scale-105 ease-linear duration-200"
                >
                  <div className="h-52 shadow-xl w-fit flex flex-row relative rounded-lg">
                    {/* <div className="absolute bg-white rounded-full p-1 shadow-lg -top-2 -left-2">
                    {isFavoris ? (
                      <FillHeart onClick={() => removeBookFromFavoris(id)} />
                    ) : (
                      <StrokeHeart
                        onClick={() => handleImageClick(googleBook)}
                      />
                    )}
                  </div> */}
                    <Link to={"/accueil/livre-detail/" + item.id}>
                      <img
                        className="h-full rounded-lg w-32 cursor-pointer"
                        src={cover_link}
                        alt={item.volumeInfo.title}
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
                    {item.volumeInfo.title}
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </Layout>
  );
};

export default SearchResults;
