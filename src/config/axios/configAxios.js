import Axios from "axios";

export const myAxios = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  xsrfHeaderName: "X-XSRF-TOKEN",
  withCredentials: true,
});
