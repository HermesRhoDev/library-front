import { toast } from "react-toastify";
import { myAxios } from "../config/axios/configAxios";
import { toastConfig } from "../utils/toast/config";
import { csrf } from "./csrfAction";
import { fetchCollections } from "./myCollectionAction";

/**
 * La fonction addBookToFavoris prend en entrée trois arguments : dispatch 
 * (une fonction de Redux pour dispatcher des actions), 
 * googleBookInfo (les détails du livre provenant de l'API Google Books)
 * et collectionFavoris (le nom de la collection dans laquelle le livre doit être ajouté).
 */

export const addBookToFavoris = async (
  dispatch,
  googleBookInfo,
  collectionFavoris
) => {
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
    console.log(error);
    throw error;
  }
};
