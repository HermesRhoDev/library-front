import * as Yup from "yup";

export const CreateColelctionValidation = Yup.object().shape({
  name: Yup.string().max(20, "20 caractères maximum").required("Requis"),
});
