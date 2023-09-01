// Importation de la bibliothèque Axios
import Axios from "axios";

// Création d'une instance personnalisée d'Axios
export const myAxios = Axios.create({
  // Configuration de l'URL de base pour les requêtes
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // Configuration des en-têtes (headers) à inclure dans chaque requête
  headers: {
    "X-Requested-With": "XMLHttpRequest", // Indique que la requête est effectuée avec XMLHttpRequest
  },

  // Configuration du nom de l'en-tête utilisé pour le jeton anti-CSRF
  xsrfHeaderName: "X-XSRF-TOKEN",

  // Activation de l'envoi des cookies et des informations d'authentification
  withCredentials: true,
});