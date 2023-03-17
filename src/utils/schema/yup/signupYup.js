import * as Yup from "yup";

export const SignupSchemaValidation = Yup.object().shape({
  pseudo: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  first_name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  last_name: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  age: Yup.number().required().positive().integer(),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});
