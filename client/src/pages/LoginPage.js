import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { LoginValidation } from "../validations/login.schema";
import { useNavigate } from "react-router-dom";
import styles from "../styles/formContainer.module.css";
import { AuthContext } from "../context/AuthContext";
import { loginService } from "../services/login.services";

const LoginPage = () => {
  const { setIsLogin } = useContext(AuthContext);
  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await loginService.login(data);
    console.log(res.data);
    if (res.data.error) {
      alert(res.data.error);
    } else {
      localStorage.setItem("token", res.data);
      setIsLogin(true);
      navigate("/");
    }
  };

  return (
    <div className={styles.form}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={LoginValidation}
      >
        <Form className={styles.formContainer}>
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

          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
