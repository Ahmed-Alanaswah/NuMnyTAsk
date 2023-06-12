import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CreateDealValidation } from "../validations/createDeal.schema";
import { useNavigate } from "react-router-dom";
import styles from "../styles/formContainer.module.css";
import { dealServices } from "../services/deal.services";

const CreateDeal = () => {
  const initialValues = {
    name: "",
    status: "Active",
    currency: "JD",
    amount: "",
    description: "",
  };

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await dealServices.createDeal(data);
      navigate("/deals");
    } catch (err) {
      console.log(err);
      alert(err?.response?.data || err?.response || err);
    }
  };

  return (
    <div className={styles.form}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={CreateDealValidation}
      >
        <Form className={styles.formContainer} encType="multipart/form-data">
          <label>Name: </label>
          <ErrorMessage name="name" component="span" />
          <Field autoComplete="off" name="name" placeholder="Name..." />

          <label>Description: </label>
          <ErrorMessage name="description" component="span" />
          <Field
            autoComplete="off"
            name="description"
            placeholder="Description..."
          />

          <label>Status: </label>
          <ErrorMessage name="status" component="span" />
          <Field as="select" name="status">
            <option value="Active">Active</option>
            <option value="In Active">In Active</option>
            <option value="Delete">Delete</option>
            <option value="Expired">Expired</option>
          </Field>

          <label>Currency: </label>
          <ErrorMessage name="currency" component="span" />
          <Field as="select" name="currency">
            <option value="JD">JD</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </Field>

          <label>Amount: </label>
          <ErrorMessage name="amount" component="span" />
          <Field autoComplete="off" name="amount" placeholder="Amount..." />

          <button type="submit">Create User</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateDeal;
