import * as Yup from "yup";

export const SignupSchemaValidation = Yup.object().shape({
  pseudo: Yup.string().max(20, "20 caractères maximum").required("Requis"),
  first_name: Yup.string().required("Requis"),
  last_name: Yup.string().required("Requis"),
  email: Yup.string().email("Adresse e-mail invalides").required("Requis"),
  age: Yup.number()
    .required()
    .positive("L'age doit être minimum de 18 ans")
    .integer()
    .min(18, "L'âge doit être d'au moins 18 ans"),
  password: Yup.string()
    .min(8, "Mot de passe de 8 caractères minimum")
    .required("Requis"),
  password_confirmation: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Les mots de passe doivent correspondre"
    )
    .required("Requis"),
});
