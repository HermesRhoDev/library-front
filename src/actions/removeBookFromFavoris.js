/**
 * Cette fonction "removeBookFromFavoris" prend l'identifiant d'un livre, 
 * une fonction "dispatch" (pour Redux), et une collection de favoris en 
 * tant que paramètres. Elle effectue une requête DELETE vers l'endpoint 
 * approprié pour retirer le livre de la collection de favoris en utilisant Axios (objet myAxios). 
 * Après la suppression réussie, elle dispatche l'action "fetchCollections" pour 
 * mettre à jour les collections, puis affiche une notification Toast pour indiquer 
 * que le livre a été retiré des favoris. 
 * En cas d'erreur lors de la suppression, 
 * l'erreur est propagée pour être gérée ailleurs dans le code.
 */

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
