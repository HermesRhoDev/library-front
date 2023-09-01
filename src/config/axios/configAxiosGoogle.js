// Importation de la bibliothèque Axios
import Axios from "axios";

// Création d'une instance personnalisée d'Axios pour l'API Google Books
export const axiosGoogleBookApi = Axios.create({
  // Configuration de l'URL de base pour les requêtes vers l'API Google Books
  baseURL: import.meta.env.VITE_API_BASE_GOOGLE_BOOK_URL,
  // Configuration des en-têtes (headers) à inclure dans chaque requête
  headers: {
    "Content-Type": "text/json", // Spécification du type de contenu de la requête
  },
  // Désactivation de l'envoi des cookies et des informations d'authentification
  withCredentials: false,
});