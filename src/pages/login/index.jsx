import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import login from "../../actions/loginAction";
import { selectUserInfo } from "../../config/redux/reduxAuth";
import { LoginSchemaValidation } from "../../utils/schema/yup/loginYup";
import { TabTitle } from "../../utils/tabtitle";

export const Login = () => {
  TabTitle("Connexion - In The Pocket");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  return (
    <div className="w-full flex flex-row h-screen">
      <div
        className="
          w-2/5 
          bg-bg-waves-dark 
          bg-cover flex 
          justify-center 
          items-center 
          max-[640px]:hidden
          flex-col
          gap-10
        "
      >
        <img
          src="/src/assets/images/inthepocket_white_logo.png"
          alt="In The Pocket White Logo"
          className="w-32"
        />
        <h1 className="title-light text-5xl">CONNEXION</h1>
      </div>
      <div className="w-3/5 flex justify-center items-center flex-col max-[640px]:w-full gap-5">
        <img
          src="/src/assets/images/inthepocket_black_logo.png"
          alt="In The Pocket White Logo"
          className="w-32 max-[640px]:w-24 max-[640px]:block hidden"
        />
        <h2 className="max-[640px]:block title-dark hidden text-4xl max-[640px]:text-2xl">
          CONNEXION
        </h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchemaValidation}
          onSubmit={async (values) => {
            const result = await dispatch(login(values));
            if (login.rejected.match(result)) {
              const errorMessage = result.error.message;
              setLoginError(errorMessage);
            } else if (login.fulfilled.match(result)) {
              navigate("/");
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-10 max-[640px]:gap-5 justify-center items-center">
              {loginError && (
                <div className="max-[640px]:px-0 px-10 py-2 text-secondary text-center bg-red-800">
                  {loginError}
                </div>
              )}
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="E-Mail"
                  className="px-10 py-5 max-[640px]:p-5 font-bold bg-primary rounded-full text-secondary"
                />
                {errors.email && touched.email ? (
                  <div className="max-[640px]:text-sm text-red-600">
                    {errors.email}
                  </div>
                ) : null}
              </div>
              <div>
                <Field
                  name="password"
                  type={"password"}
                  placeholder="Mot de passe"
                  className="px-10 py-5 max-[640px]:p-5 font-bold bg-primary text-secondary rounded-full focus"
                />
                {errors.password && touched.password ? (
                  <div className="max-[640px]:text-sm text-red-600">
                    {errors.password}
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                className="px-10 py-5 max-[640px]:p-5 text-secondary rounded-full bg-primary uppercase font-bold text-sm"
              >
                Me Connecter
              </button>
            </Form>
          )}
        </Formik>
        <div className="flex items-center justify-center flex-col">
          <p className="text-primary">Pas de compte ?</p>
          <Link to="/inscription" className="text-primary font-bold">
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
};
