import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import register from "../../actions/authAction";
import { axios } from "../../config/axios/configAxios";
import { SignupSchemaValidation } from "../../utils/schema/yup/signupYup";

export const Signup = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  return (
    <>
      <Link to="/">Gooooooo</Link>
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
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-10">
            <Field name="first_name" />
            {errors.first_name && touched.first_name ? (
              <div>{errors.first_name}</div>
            ) : null}

            <Field name="last_name" />
            {errors.last_name && touched.last_name ? (
              <div>{errors.last_name}</div>
            ) : null}

            <Field name="pseudo" />
            {errors.pseudo && touched.pseudo ? (
              <div>{errors.pseudo}</div>
            ) : null}

            <Field name="age" type="number" />
            {errors.age && touched.age ? <div>{errors.age}</div> : null}

            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}

            <Field name="password" type="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}

            <Field name="password_confirmation" type="password" />
            {errors.password_confirmation && touched.password_confirmation ? (
              <div>{errors.password_confirmation}</div>
            ) : null}

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </>
  );
};
