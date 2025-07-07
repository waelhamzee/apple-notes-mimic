import { Alert, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useLogin } from "../hooks/useLogin";
import type { LoginCredentials } from "../types";
import { loginSchema } from "../yup";
import { extractAxiosError } from "@/utils/extractAxiosError";
import { useNavigate } from "react-router-dom";

const initialLogin: LoginCredentials = { email: "", password: "" };

export default function LoginForm() {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const loginMutation = useLogin((response) => {
    console.log(response)
    if (response?.data) {
      login(response.data);
      navigate("/notes");
    }
  });

  return (
    <Formik<LoginCredentials>
      initialValues={initialLogin}
      validationSchema={loginSchema}
      onSubmit={(values, { setSubmitting }) => {
        setError("");
        loginMutation.mutate(values, {
          onError: (err: unknown) => setError(extractAxiosError(err)),
          onSettled: () => setSubmitting(false),
        });
      }}
    >
      {({
        isSubmitting,
        errors,
        touched,
        handleChange,
        handleBlur,
        values,
      }) => (
        <Form>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            margin="normal"
            fullWidth
            size="small"
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            FormHelperTextProps={{
              sx: { minHeight: 20, maxHeight: 20, overflow: "hidden" },
            }}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            size="small"
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            FormHelperTextProps={{
              sx: { minHeight: 20, maxHeight: 20, overflow: "hidden" },
            }}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={isSubmitting || loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
