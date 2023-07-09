import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchCollections } from "../../actions/myCollectionAction";
import { FillHeart } from "../../assets/svg/fillHeart";
import Layout from "../../components/layout";
import { myAxios } from "../../config/axios/configAxios";
import { selectUserInfo } from "../../config/redux/reduxAuth";
import { selectFetchCollections } from "../../config/redux/reduxCollection";
import { toastConfig } from "../../utils/toast/config";

export const MyCollections = () => {
  const collections = useSelector(selectFetchCollections);
  const dispatch = useDispatch();
  const csrf = () => myAxios.get("sanctum/csrf-cookie");
  const [deleteConfirmation, setDeleteConfirmation] = useState({});
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const [confirmPublic, setConfirmPublic] = useState({});

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    dispatch(fetchCollections());
  }, [userInfo]);

  const deleteCollection = async (id) => {
    try {
      await csrf();
      const response = await myAxios.delete(`/api/destroy-collection/${id}`);
      setDeleteConfirmation((prevState) => ({
        ...prevState,
        [id]: false,
      }));
      dispatch(fetchCollections());
      toast.success("Collection supprimée avec succès", { toastConfig });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const showDeleteConfirmation = (id) => {
    setDeleteConfirmation((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const showPublicConfirmation = (id) => {
    setConfirmPublic((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const setCollectionAsPublic = async (collectionId) => {
    try {
      await myAxios.put(`/api/collection/${collectionId}/set-public`);
      toast.success("Collection rendue publique avec succès", { toastConfig });
      dispatch(fetchCollections());
    } catch (error) {
      throw error;
    }
  };

  const setCollectionAsPrivate = async (collectionId) => {
    try {
      await myAxios.put(`/api/collection/${collectionId}/set-private`);
      toast.success("Collection rendue privée avec succès", { toastConfig });
      dispatch(fetchCollections());
    } catch (error) {
      throw error;
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-5 gap-5 place-items-center max-[768px]:grid-cols-2">
        {collections
          ? collections.map((collection) => {
              const collectionId = collection.id;

              return (
                <Fragment key={collection.id}>
                  <div className="w-44 h-36 relative bg-white shadow-lg rounded-lg">
                    <Link to={"/mescollections/collection/" + collectionId}>
                      <div
                        style={{ overflowWrap: "anywhere" }}
                        className="uppercase font-bold max-w-full h-full text-center flex items-center justify-center"
                      >
                        {collection.name === "Favoris" ? (
                          <FillHeart />
                        ) : (
                          collection.name
                        )}
                      </div>
                    </Link>
                    {collection.name === "Favoris" ? null : (
                      <>
                        <button
                          onClick={() => {
                            showDeleteConfirmation(collectionId);
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

                        {/* BOUTON POUR PASSER UNE COLLECTION EN PUBLIC */}
                        <button className="p-2 bg-white rounded-full shadow-lg absolute -top-2 -right-2">
                          {collection.isPublic ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6"
                              onClick={() =>
                                showPublicConfirmation(collectionId)
                              }
                            >
                              <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 10-7.5 0v3a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3h9v-3c0-2.9 2.35-5.25 5.25-5.25z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6"
                              onClick={() =>
                                showPublicConfirmation(collectionId)
                              }
                            >
                              <path
                                fillRule="evenodd"
                                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                      </>
                    )}
                  </div>

                  {deleteConfirmation[collectionId] && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-primary bg-opacity-70">
                      <div className="bg-white p-4 rounded shadow-lg">
                        <p>Voulez-vous vraiment supprimer cette collection ?</p>
                        <div className="flex justify-end mt-4">
                          <button
                            className="bg-gray-200 px-4 py-2 rounded mr-2"
                            onClick={() =>
                              setDeleteConfirmation((prevState) => ({
                                ...prevState,
                                [collectionId]: false,
                              }))
                            }
                          >
                            Annuler
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => deleteCollection(collectionId)}
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {confirmPublic[collectionId] && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-primary bg-opacity-70">
                      <div className="bg-white p-4 rounded shadow-lg">
                        {!collection.isPublic ? (
                          <>
                            <p>
                              Voulez-vous vraiment rendre cette collection
                              publique ?
                            </p>
                            <div className="flex justify-end mt-4">
                              <button
                                className="bg-gray-200 px-4 py-2 rounded mr-2"
                                onClick={() =>
                                  setConfirmPublic((prevState) => ({
                                    ...prevState,
                                    [collectionId]: false,
                                  }))
                                }
                              >
                                Annuler
                              </button>
                              <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={() =>
                                  setCollectionAsPublic(collectionId)
                                }
                              >
                                Rendre public
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <p>
                              Voulez-vous vraiment rendre cette collection
                              privée ?
                            </p>
                            <div className="flex justify-end mt-4">
                              <button
                                className="bg-gray-200 px-4 py-2 rounded mr-2"
                                onClick={() =>
                                  setConfirmPublic((prevState) => ({
                                    ...prevState,
                                    [collectionId]: false,
                                  }))
                                }
                              >
                                Annuler
                              </button>
                              <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={() =>
                                  setCollectionAsPrivate(collectionId)
                                }
                              >
                                Rendre privée
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </Fragment>
              );
            })
          : null}
      </div>
    </Layout>
  );
};
