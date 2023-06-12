import * as Yup from "yup";

export const CreateUsersValidation = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z]/, "Only alphabet characters are allowed")
    .min(5)
    .max(15)
    .required(),
  email: Yup.string().min(5).max(30).email().required(),
  password: Yup.string().min(5).max(20).required(),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required(),
  status: Yup.string().required(),
  gender: Yup.string().required(),
  dateOfBirth: Yup.string().required(),
});
