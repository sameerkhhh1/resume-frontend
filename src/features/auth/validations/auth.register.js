import * as yup from "yup";

export const registerSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),

  email: yup.string().email("Invalid email").required("Email is required"),

  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm Password is required"),
});
