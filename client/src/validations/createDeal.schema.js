import * as Yup from "yup";

export const CreateDealValidation = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z]/, "Only alphabet characters are allowed")
    .min(5)
    .max(15)
    .required(),
  description: Yup.string()
    .matches(/^[A-Za-z]/, "Only alphabet characters are allowed")
    .min(5)
    .max(20)
    .required(),
  status: Yup.string().required(),
  currency: Yup.string().required(),
  amount: Yup.number()
    .required()
    .positive("Amount must be a positive number")
    .max(10000, "Amount cannot exceed 10,000"),
});
