import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchCollections } from "../../actions/myCollectionAction";
import updateProfile from "../../actions/updateProfileAction";
import Layout from "../../components/layout";
import { selectUserInfo } from "../../config/redux/reduxAuth";
import { TabTitle } from "../../utils/tabtitle";
import { toastConfig } from "../../utils/toast/config";

export const MyAccount = () => {
  TabTitle("Mon compte - In The Pocket");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      navigate("/connexion");
    } else {
      dispatch(fetchCollections());
    }
  }, [userInfo]);

  return (
    <Layout>
      <div className="w-full flex justify-center items-center">
        <div className="w-96">
          {updateError && (
            <div className="text-red-600 mb-4">{updateError}</div>
          )}
          <Formik
            initialValues={{
              first_name: userInfo ? userInfo.first_name : "",
              last_name: userInfo ? userInfo.last_name : "",
              email: userInfo ? userInfo.email : "",
              pseudo: userInfo ? userInfo.pseudo : "", // Ajout du champ "pseudo"
              age: userInfo ? userInfo.age : 0, // Ajout du champ "age"
            }}
            enableReinitialize={true}
            onSubmit={async (values) => {
              const result = await dispatch(updateProfile(values));
              if (updateProfile.rejected.match(result)) {
                setUpdateError(result.error.message);
              } else if (updateProfile.fulfilled.match(result)) {
                toast.success("Votre profil a bien été mis à jour !", {
                  toastConfig,
                });
                navigate("/moncompte");
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col gap-4">
                <div>
                  <label htmlFor="first_name" className="text-lg font-semibold">
                    Prénom
                  </label>
                  <Field
                    id="first_name"
                    name="first_name"
                    type="text"
                    className="w-full px-5 py-2 font-medium rounded-full"
                  />
                  {errors.first_name && touched.first_name ? (
                    <div className="text-red-600">{errors.first_name}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="last_name" className="text-lg font-semibold">
                    Nom
                  </label>
                  <Field
                    id="last_name"
                    name="last_name"
                    type="text"
                    className="w-full px-5 py-2 font-medium rounded-full"
                  />
                  {errors.last_name && touched.last_name ? (
                    <div className="text-red-600">{errors.last_name}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="pseudo" className="text-lg font-semibold">
                    Pseudo
                  </label>
                  <Field
                    id="pseudo"
                    name="pseudo"
                    type="text"
                    className="w-full px-5 py-2 font-medium rounded-full"
                  />
                  {errors.pseudo && touched.pseudo ? (
                    <div className="text-red-600">{errors.pseudo}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="age" className="text-lg font-semibold">
                    Âge
                  </label>
                  <Field
                    id="age"
                    name="age"
                    type="number"
                    className="w-full px-5 py-2 font-medium rounded-full"
                  />
                  {errors.age && touched.age ? (
                    <div className="text-red-600">{errors.age}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="email" className="text-lg font-semibold">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="w-full px-5 py-2 font-medium rounded-full"
                  />
                  {errors.email && touched.email ? (
                    <div className="text-red-600">{errors.email}</div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-secondary rounded-full font-bold uppercase"
                >
                  Enregistrer
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};
