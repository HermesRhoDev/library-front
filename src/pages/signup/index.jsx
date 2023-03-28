import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import register from "../../actions/registerAction";
import { selectUserInfo } from "../../config/redux/reduxAuth";
import { SignupSchemaValidation } from "../../utils/schema/yup/signupYup";

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  return (
    <div className="w-full bg-black h-screen flex flex-col justify-center items-center gap-16">
      <Link
        to="/"
        className="px-7 py-4 text-black bg-white uppercase font-bold"
      >
        Vers l'accueil
      </Link>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          age: 0,
          pseudo: "",
          password: "",
          password_confirmation: "",
        }}
        validationSchema={SignupSchemaValidation}
        onSubmit={(values) => {
          dispatch(register(values));
          navigate("/");
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-10">
            <Field
              name="first_name"
              placeholder="Prénom"
              className="px-10 py-5 rounded-full font-bold"
            />
            {errors.first_name && touched.first_name ? (
              <div className="text-white uppercase font-bold">
                {errors.first_name}
              </div>
            ) : null}

            <Field
              name="last_name"
              placeholder="Nom"
              className="px-10 py-5 rounded-full font-bold"
            />
            {errors.last_name && touched.last_name ? (
              <div>{errors.last_name}</div>
            ) : null}

            <Field
              name="pseudo"
              placeholder="Pseudo"
              className="px-10 py-5 rounded-full font-bold"
            />
            {errors.pseudo && touched.pseudo ? (
              <div>{errors.pseudo}</div>
            ) : null}

            <Field
              name="age"
              type="number"
              placeholder="Age"
              className="px-10 py-5 rounded-full font-bold"
            />
            {errors.age && touched.age ? <div>{errors.age}</div> : null}

            <Field
              name="email"
              type="email"
              placeholder="Mail"
              className="px-10 py-5 rounded-full font-bold"
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}

            <Field
              name="password"
              type="password"
              placeholder="Mot de passe"
              className="px-10 py-5 rounded-full font-bold"
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}

            <Field
              name="password_confirmation"
              type="password"
              placeholder="Confirmation mot de passe"
              className="px-10 py-5 rounded-full font-bold"
            />
            {errors.password_confirmation && touched.password_confirmation ? (
              <div>{errors.password_confirmation}</div>
            ) : null}

            <button
              type="submit"
              className="px-7 py-4 text-black bg-white uppercase font-bold"
            >
              M'inscrire
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
