import * as yup from "yup";

export const validationSchemaRegister = yup.object().shape({
  fullname: yup.string().required("Email is required").min(3),
  email: yup.string().required().email(),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .uppercase("password begins with an uppercase letter")
    .matches(/\d/, 'Must contain numbers')
    .matches(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      "The password must contain special characters"
    ),
});

export const validationSchemaLogin = yup.object().shape({
  email: yup.string().required("Email is required").email(),
  password: yup
  .string()
  .required("Password is required")
  .min(6, "Password must be at least 6 characters")
  .uppercase("Password begins with an uppercase letter")
  // .matches(/\d/, 'Must contain numbers')
  .matches(
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
    "The password must contain special characters"
  ),
});

export const validationSchemaCreateProduct = yup.object().shape({
  name: yup.string().required("Product name is required"),
  price: yup.number().required("Price is required"),
  stock: yup.number().required("Stock is required"),
  description: yup.string().required("Description is required"),
})
