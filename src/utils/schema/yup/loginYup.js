import * as Yup from "yup";

export const LoginSchemaValidation = Yup.object().shape({
  email: Yup.string().email("Adresse mail invalide").required("Requis"),
  password: Yup.string()
    .min(8, "Mot de passe de 8 caractères minimum.")
    .required("Requis"),
});
