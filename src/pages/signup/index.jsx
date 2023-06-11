import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import register from "../../actions/registerAction";
import { selectUserInfo } from "../../config/redux/reduxAuth";
import { SignupSchemaValidation } from "../../utils/schema/yup/signupYup";
import { TabTitle } from "../../utils/tabtitle";

export const Signup = () => {
  TabTitle("Inscription - In The Pocket");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);

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
        <h1 className="title-light text-5xl">INSCRIPTION</h1>
      </div>
      <div className="w-3/5 flex justify-center min-h-screen h-fit items-center flex-col max-[640px]:w-full gap-5 py-10 px-5">
        <img
          src="/src/assets/images/inthepocket_black_logo.png"
          alt="In The Pocket White Logo"
          className="w-32 max-[640px]:w-24 max-[640px]:block hidden"
        />
        <h2 className="max-[640px]:block title-dark hidden text-4xl max-[640px]:text-2xl">
          INSCRIPTION
        </h2>
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
          onSubmit={async (values) => {
            const result = await dispatch(register(values));
            if (register.rejected.match(result)) {
              const errorMessage = result.error.message;
              console.log(errorMessage);
            } else if (register.fulfilled.match(result)) {
              navigate("/");
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-5 max-[640px]:gap-5 justify-center items-center">
              <div className="flex flex-row gap-5 max-[640px]:flex-col">
                <div>
                  <Field
                    name="first_name"
                    placeholder="Prénom"
                    className="w-full px-10 py-5 max-[640px]:p-2 font-bold bg-primary text-secondary"
                  />
                  {errors.first_name && touched.first_name ? (
                    <div className="max-[640px]:text-sm text-red-600">
                      {errors.first_name}
                    </div>
                  ) : null}
                </div>

                <div>
                  <Field
                    name="last_name"
                    placeholder="Nom"
                    className="w-full px-10 py-5 max-[640px]:p-2 font-bold bg-primary text-secondary"
                  />
                  {errors.last_name && touched.last_name ? (
                    <div className="max-[640px]:text-sm text-red-600">
                      {errors.last_name}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-row max-[640px]:flex-col gap-5">
                <div>
                  <Field
                    name="pseudo"
                    placeholder="Pseudo"
                    className="w-full px-10 py-5 max-[640px]:p-2 font-bold bg-primary text-secondary"
                  />
                  {errors.pseudo && touched.pseudo ? (
                    <div className="max-[640px]:text-sm text-red-600">
                      {errors.pseudo}
                    </div>
                  ) : null}
                </div>

                <div>
                  <Field
                    name="age"
                    type="number"
                    placeholder="Age"
                    className="w-full px-10 py-5 max-[640px]:p-2 font-bold bg-primary text-secondary"
                  />
                  {errors.age && touched.age ? (
                    <div className="max-[640px]:text-sm text-red-600">
                      {errors.age}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="w-full">
                <Field
                  name="email"
                  type="email"
                  placeholder="Mail"
                  className="w-full px-10 py-5 max-[640px]:p-2 font-bold bg-primary text-secondary"
                />
                {errors.email && touched.email ? (
                  <div className="max-[640px]:text-sm text-red-600">
                    {errors.email}
                  </div>
                ) : null}
              </div>

              <div className="flex flex-row max-[640px]:flex-col gap-5">
                <div>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Mot de passe"
                    className="w-full px-10 py-5 max-[640px]:p-2 font-bold bg-primary text-secondary"
                  />
                  {errors.password && touched.password ? (
                    <div className="max-[640px]:text-sm text-red-600">
                      {errors.password}
                    </div>
                  ) : null}
                </div>
                <div>
                  <Field
                    name="password_confirmation"
                    type="password"
                    placeholder="Confirmation mot de passe"
                    className="w-full px-10 py-5 max-[640px]:p-2 font-bold bg-primary text-secondary"
                  />
                  {errors.password_confirmation &&
                  touched.password_confirmation ? (
                    <div className="max-[640px]:text-sm text-red-600">
                      {errors.password_confirmation}
                    </div>
                  ) : null}
                </div>
              </div>

              <button
                type="submit"
                className="px-10 py-5 max-[640px]:p-2 text-secondary bg-primary uppercase font-bold text-sm"
              >
                M'inscrire
              </button>
            </Form>
          )}
        </Formik>
        <div className="flex items-center justify-center flex-col">
          <p className="text-primary">Avez-vous déjà un compte ?</p>
          <Link to="/login" className="text-primary font-bold">
            Connexion
          </Link>
        </div>
      </div>
    </div>
  );
};
