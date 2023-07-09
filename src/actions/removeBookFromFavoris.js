import { toast } from "react-toastify";
import { myAxios } from "../config/axios/configAxios";
import { toastConfig } from "../utils/toast/config";
import { csrf } from "./csrfAction";
import { fetchCollections } from "./myCollectionAction";

export const removeBookFromFavoris = async (
  bookId,
  dispatch,
  collectionFavoris
) => {
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
