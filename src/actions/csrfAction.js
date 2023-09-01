// Ce module exporte une fonction nommée "csrf" qui effectue une requête HTTP GET
// à l'endpoint "sanctum/csrf-cookie" en utilisant l'objet "myAxios".

// Importe l'objet "myAxios" du fichier "../config/axios/configAxios".

import { myAxios } from "../config/axios/configAxios";

// Définit une fonction nommée "csrf".
// Utilise l'objet "myAxios" pour effectuer une requête GET à l'endpoint
// "sanctum/csrf-cookie". Cette requête est généralement utilisée pour obtenir
// un jeton CSRF (Cross-Site Request Forgery) depuis un serveur.
// Les jetons CSRF sont utilisés pour protéger les applications Web contre les
// attaques de type CSRF en garantissant que les requêtes proviennent d'une source
// de confiance.
export const csrf = () => myAxios.get("sanctum/csrf-cookie");