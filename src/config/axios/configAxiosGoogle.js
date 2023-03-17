import Axios from "axios";

export const axiosGoogleBookApi = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_GOOGLE_BOOK_URL,
  headers: {
    "Content-Type": "text/json",
  },
  withCredentials: false,
});
