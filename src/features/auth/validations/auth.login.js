// auth/validations/auth.login.js
import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup
    .string()
    .min(4, "Password too short")
    .required("Password required"),
});
