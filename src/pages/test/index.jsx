import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axios } from "../../config/axios/configAxios";
import { getBooks, selectBooks } from "../../config/redux/redux";
import { login, logout, selectUserInfo } from "../../config/redux/reduxAuth";

export const Test = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
    }

    dispatch(getBooks());
  }, []);

  if (books.length > 0) {
    console.log(books);
  }

  if (userInfo) {
    console.log(userInfo);
  }

  const userLogin = {
    email: "lumarin2001@gmail.com",
    password: "1234567890",
  };

  const collectionInfo = {
    name: "testwithbook",
    book_id: "2KUJX7vPsWhUeS7z",
  };

  const collections = async () => {
    const user_id = "a2316812-d397-4441-b927-4d8ecf739d5f";
    axios
      .get(`api/collections/${user_id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.response.data.message));
  };

  const collection = async () => {
    const id = "ba33bcea-96c6-44ba-8925-3806adf6ade1";
    axios
      .get(`api/collection/${id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.response.data.message));
  };

  const storeCollection = async () => {
    axios
      .post(`api/collection/store`, collectionInfo)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.response.data.message));
  };

  return (
    <>
      <div className="w-full h-screen bg-black flex flex-col items-center justify-center gap-10">
        <h1 className="text-white font-bold text-4xl">Hello World !</h1>
        <div className="flex flex-row gap-5 flex-wrap w-full justify-center">
          <Link
            to="/signup"
            className="bg-white text-blac px-5 py-2 uppercase font-bold"
          >
            M'inscrire
          </Link>
          <button
            onClick={() => dispatch(login(userLogin))}
            className="bg-white text-blac px-5 py-2 uppercase font-bold"
          >
            Me Connecter
          </button>
          <button
            onClick={() => collections()}
            className="bg-white text-blac px-5 py-2 uppercase font-bold"
          >
            Mes Collections
          </button>
          <button
            onClick={() => collection()}
            className="bg-white text-blac px-5 py-2 uppercase font-bold"
          >
            Une Collection de mes collections
          </button>
          <button
            onClick={() => storeCollection()}
            className="bg-white text-blac px-5 py-2 uppercase font-bold"
          >
            Ajout d'une collection
          </button>
          {userInfo ? (
            <button
              onClick={() => dispatch(logout())}
              className="bg-white text-blac px-5 py-2 uppercase font-bold"
            >
              Me Déconnecter
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
