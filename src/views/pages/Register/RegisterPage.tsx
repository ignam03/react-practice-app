import React from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../context/notification.context";
import { registerValidate } from "../../../utils/validateForm";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import useApiService from "../../../api/useApiService";

type RegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const RegisterPage: React.FC<{}> = () => {
  const { getSuccess } = useNotification();
  // const [registerData, setRegisterData] = useState<RegisterType>({
  //   email: "",
  //   password: "",
  //   firstName: "",
  //   LastName: "",
  // });
  // const navigate = useNavigate();

  // const dataRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setRegisterData({
  //     ...registerData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   registerValidate
  //     .validate(registerData)
  //     .then(() => {
  //       getSuccess(JSON.stringify(registerData));
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       getError(error.message);
  //     });
  // };

  const navigate = useNavigate();
  const { register } = useApiService();

  const formik = useFormik<RegisterType>({
    initialValues: {
      firstName:"",
      lastName:"",
      email: "",
      password: "",
    },
    validationSchema: registerValidate,
    onSubmit: (values: RegisterType) => {
      getSuccess("Register successfully");
      register(values);
      navigate('/');
    },
  });

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
            <Typography variant="h4" sx={{ mt: 1, mb: 1 }}>
              Register React App
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
              <TextField
                name="firstName"
                margin="normal"
                fullWidth
                type="text"
                label="first-Name "
                sx={{ mt: 2, mb: 1.5 }}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField
                name="lastName"
                margin="normal"
                fullWidth
                type="text"
                label="last-Name"
                sx={{ mt: 2, mb: 1.5 }}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
              <TextField
                name="email"
                margin="normal"
                fullWidth
                type="email"
                label="Email"
                sx={{ mt: 2, mb: 1.5 }}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                name="password"
                margin="normal"
                fullWidth
                type="password"
                label="password"
                sx={{ mt: 2, mb: 1.5 }}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 1.5, mb: 3 }}
              >
                Register Account
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
