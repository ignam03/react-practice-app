import * as yup from "yup";

export const loginValidate = yup.object().shape({
  email: yup.string().trim().required("Email is required"),
  password: yup.string().trim().required("Password is required"),
  // .min(8, "minimum 8 characters")
  // .max(20, "max 8 characters"),
});

export const registerValidate = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email"),
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(8, "min 8 characters")
    .max(20, "max 20 characters"),
  firstName: yup
    .string()
    .trim()
    .required("firstName is required")
    .min(3, "min 3 characters")
    .max(10, "  max 10 characters"),
  lastName: yup
    .string()
    .trim()
    .required("lastName is required")
    .min(3, "min 3 characters")
    .max(10, "  max 10 characters"),
});

export const TaskValidate = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(10, "min 10 characters"),
  description: yup
    .string()
    .trim()
    .min(10, "min 10 characters")
    .max(50, "max 50 characters"),
  loadDate: yup
    .date()
    .min(new Date(), "Min date must be today ")
    .required("Date is required"),
  taskType: yup.string().trim().required("Task type is required"),
});
