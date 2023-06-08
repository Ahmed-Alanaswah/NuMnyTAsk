import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CreateUsersValidation } from "../validations/createUsers.schema";
import { useNavigate } from "react-router-dom";
import styles from "../styles/formContainer.module.css";
import { userServices } from "../services/user.services";

const LoginPage = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    status: "",
    gender: "",
    dateOfBirth: "",
  };

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await userServices.createUser(data);
      navigate("/users");
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <div className={styles.form}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={CreateUsersValidation}
      >
        <Form className={styles.formContainer}>
          <label>Name: </label>
          <ErrorMessage name="name" component="span" />
          <Field autoComplete="off" name="name" placeholder="Name..." />

          <label>Email: </label>
          <ErrorMessage name="email" component="span" />
          <Field autoComplete="off" name="email" placeholder="Email..." />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            type="password"
            autoComplete="off"
            name="password"
            placeholder="password..."
          />

          <label>Phone: </label>
          <ErrorMessage name="phone" component="span" />
          <Field autoComplete="off" name="phone" placeholder="phone..." />

          <label>Status: </label>
          <ErrorMessage name="status" component="span" />
          <Field autoComplete="off" name="status" placeholder="status..." />

          <label>Gender: </label>
          <ErrorMessage name="gender" component="span" />
          <Field autoComplete="off" name="gender" placeholder="gender..." />

          <label>Date of birth </label>
          <ErrorMessage name="dateOfBirth" component="span" />
          <Field autoComplete="off" name="dateOfBirth" type="date" />
          <button type="submit">Create User</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
