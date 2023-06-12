import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNotification } from "../../../context/notification.context";
import { loginValidate } from "../../../utils/validateForm";
import { useFormik } from "formik";
import useApiService from "../../../api/useApiService";
import { useNavigate } from "react-router-dom";

type LoginType = {
  email: string;
  password: string;
};

export const LoginPage: React.FC<{}> = () => {
  const { getError, getSuccess } = useNotification();
  const navigate = useNavigate();
  const { login } = useApiService();

  const formik = useFormik<LoginType>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidate,
    onSubmit: async (values: LoginType) => {
      try {
        await login(values).then((res) => {
          if (!res) {
            getError("Login failed");
            return;
          }
          getSuccess("Login successfully");
          navigate("/to-do-list");
        });
      } catch (error: any) {
        getError(error.message);
      }
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
              Login
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
              <TextField
                name="email"
                margin="normal"
                fullWidth
                type="text"
                label="User or email"
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
                label="Password"
                sx={{ mt: 1.5, mb: 2.5 }}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 1.5, mb: 3 }}
              >
                Login Page
              </Button>
            </Box>
            <ButtonGroup
              fullWidth
              disableElevation
              variant="contained"
              aria-label="Disabled elevation buttons"
              sx={{ mr: 5, py: 2 }}
            >
              <Button
                fullWidth
                onClick={() => {
                  navigate("/register");
                }}
              >
                Create your account
              </Button>
              <Button
                fullWidth
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                forgot password?
              </Button>
            </ButtonGroup>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
