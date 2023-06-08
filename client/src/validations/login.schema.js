import * as Yup from "yup";

export const LoginValidation = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().min(3).max(15).required(),
});
