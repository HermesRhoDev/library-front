import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import login from "../../actions/loginAction";
import { selectUserInfo } from "../../config/redux/reduxAuth";
import { LoginSchemaValidation } from "../../utils/schema/yup/loginYup";

export const Login = () => {
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
          email: "",
          password: "",
        }}
        validationSchema={LoginSchemaValidation}
        onSubmit={(values) => {
          dispatch(login(values));
          navigate("/");
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-10">
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

            <button
              type="submit"
              className="px-7 py-4 text-black bg-white uppercase font-bold"
            >
              Me Connecter
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
