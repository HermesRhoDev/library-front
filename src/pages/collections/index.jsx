import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollections } from "../../actions/myCollectionAction";
import { FillHeart } from "../../assets/svg/fillHeart";
import Layout from "../../components/layout";
import { axios } from "../../config/axios/configAxios";
import { selectFetchCollections } from "../../config/redux/reduxCollection";

export const MyCollections = () => {
  const collections = useSelector(selectFetchCollections);
  const dispatch = useDispatch();
  const csrf = () => axios.get("sanctum/csrf-cookie");

  useEffect(() => {
    dispatch(fetchCollections());
  }, []);

  const deleteCollection = async (id) => {
    try {
      await csrf();
      const response = await axios.delete(`/api/destroy-collection/${id}`);
      dispatch(fetchCollections());
      return response;
    } catch (error) {
      throw error;
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-5 gap-5 place-items-center max-[768px]:grid-cols-2">
        {collections
          ? collections.map((collection) => {
              return (
                <div
                  key={collection.id}
                  className="w-44 h-36 relative bg-white shadow-lg rounded-lg flex items-center justify-center break-words"
                >
                  <div className="uppercase font-bold max-w-full text-center">
                    {collection.name === "Favoris" ? (
                      <FillHeart />
                    ) : (
                      collection.name
                    )}
                  </div>
                  {collection.name === "Favoris" ? null : (
                    <button
                      onClick={() => {
                        deleteCollection(collection.id);
                      }}
                      className="p-2 bg-white rounded-full shadow-lg absolute -top-2 -left-2"
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
                    </button>
                  )}
                </div>
              );
            })
          : null}
      </div>
    </Layout>
  );
};
