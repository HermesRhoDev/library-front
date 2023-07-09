import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import createCollection from "../../actions/createCollectionAction";
import { fetchCollections } from "../../actions/myCollectionAction";
import { selectUserInfo } from "../../config/redux/reduxAuth";
import { CreateColelctionValidation } from "../../utils/schema/yup/createCollectionValidation";

export const Modal = () => {
  const dispatch = useDispatch();
  const selectUserInfos = useSelector(selectUserInfo);

  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-screen bg-primary bg-opacity-70"
    >
      <div className="relative w-full max-w-2xl max-h-full bg-secondary rounded-lg shadow">
        <div className="flex items-start justify-between p-4 border-b rounded-t">
          <h3 className="text-xl font-semibold text-primary flex-1 text-center">
            Créer une collection
          </h3>
          <button
            type="button"
            className="text-primary bg-transparent hover:bg-primary hover:text-secondary rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            data-modal-hide="defaultModal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
              style={{ pointerEvents: "none" }}
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Fermer la modal</span>
          </button>
        </div>

        <div className="p-6 flex items-center justify-center">
          <Formik
            initialValues={{ name: "", user_id: selectUserInfos.id }}
            validationSchema={CreateColelctionValidation}
            onSubmit={async (values) => {
              const result = await dispatch(createCollection(values));
              if (createCollection.fulfilled.match(result)) {
                dispatch(fetchCollections());
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col justify-center items-center gap-5">
                <Field
                  name="name"
                  placeholder="Nom de la collection"
                  className="py-2 px-5 rounded-full bg-primary text-secondary"
                />
                {errors.name && touched.name ? (
                  <div className="max-[640px]:text-sm text-red-600">
                    {errors.name}
                  </div>
                ) : null}
                <div className="flex items-center justify-center space-x-2 rounded-b">
                  <button
                    type="submit"
                    className="text-secondary bg-green-600 hover:bg-green-700 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                  >
                    Valider
                  </button>
                  <button
                    data-modal-hide="defaultModal"
                    type="button"
                    className="text-secondary bg-red-600 hover:bg-red-700 rounded-full border text-sm font-medium px-5 py-2.5"
                  >
                    Annuler
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
