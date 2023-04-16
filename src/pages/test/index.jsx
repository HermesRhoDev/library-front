import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logout from "../../actions/logoutAction";
import myCollections from "../../actions/myCollectionAction";
import { selectUserInfo } from "../../config/redux/reduxAuth";
import { getBooks } from "../../config/redux/reduxGoogleBook";

export const Test = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  // const collectionInfo = {
  //   name: "testwithbook",
  //   // book_id: "2KUJX7vPsWhUeS7z",
  // };

  // const collection = async () => {
  //   const id = "ba33bcea-96c6-44ba-8925-3806adf6ade1";
  //   axios
  //     .get(`api/collection/${id}`)
  //     .then((response) => console.log(response.data))
  //     .catch((error) => console.log(error.response.data.message));
  // };

  // const storeCollection = async () => {
  //   axios
  //     .post(`api/collection/store`, collectionInfo)
  //     .then((response) => console.log(response.data))
  //     .catch((error) => console.log(error.response.data.message));
  // };

  return (
    <>
      <div className="w-full h-screen bg-black flex flex-col items-center justify-center gap-10">
        {userInfo ? (
          <>
            <h1 className="text-white font-bold text-4xl">{`Bonjour ${userInfo.first_name} ${userInfo.last_name}`}</h1>
          </>
        ) : (
          <></>
        )}
        <div className="flex flex-row gap-5 flex-wrap w-full justify-center">
          {userInfo ? (
            <>
              <button
                onClick={() => dispatch(myCollections())}
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
              <button
                onClick={() => dispatch(logout())}
                className="bg-white text-blac px-5 py-2 uppercase font-bold"
              >
                Me Déconnecter
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-white text-blac px-5 py-2 uppercase font-bold"
              >
                M'inscrire
              </Link>
              <Link
                to="/login"
                className="bg-white text-blac px-5 py-2 uppercase font-bold"
              >
                Me Connecter
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};
