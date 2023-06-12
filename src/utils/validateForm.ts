import * as yup from "yup";

export const loginValidate = yup.object().shape({
  email: yup.string().trim().required("Email is required"),
  password: yup.string().trim().required("Password is required"),
  // .min(8, "minimum 8 characters")
  // .max(20, "max 8 characters"),
});

export const registerValidate = yup.object().shape({
  email: yup.string().trim().required("Email is required"),
  password: yup.string().trim().required("Password is required"),
  firstName: yup.string().trim().required("firstName is required"),
  lastName: yup.string().trim().required("lastName is required"),
});

export const TaskValidate = yup.object().shape({
  name: yup.string().trim().required("Name is required"),
  description: yup.string().trim().max(50, "max 50 characters"),
  loadDate: yup.string().trim(),
  taskType: yup.string().trim(),
});
