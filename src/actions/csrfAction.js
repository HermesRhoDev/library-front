import { myAxios } from "../config/axios/configAxios";

export const csrf = () => myAxios.get("sanctum/csrf-cookie");