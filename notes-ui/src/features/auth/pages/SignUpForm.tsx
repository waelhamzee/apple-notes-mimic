import { extractAxiosError } from "@/utils/extractAxiosError";
import { Alert, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useSignUp } from "../hooks/useSignUp";
import type { SignUpCredentials } from "../types";
import { signUpSchema } from "../yup";
import { useNavigate } from "react-router-dom";

const initialSignUp: SignUpCredentials = { email: "", password: "", name: "" };

export default function SignUpForm() {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const signUpMutation = useSignUp((response) => {
    if (response?.data) {
      login(response.data);
      navigate("/notes");
    }
  });

  return (
    <Formik<SignUpCredentials>
      initialValues={initialSignUp}
      validationSchema={signUpSchema}
      onSubmit={(values, { setSubmitting }) => {
        setError("");
        signUpMutation.mutate(values, {
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
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            FormHelperTextProps={{
              sx: { minHeight: 20, maxHeight: 20, overflow: "hidden" },
            }}
            required
          />
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
            disabled={isSubmitting || signUpMutation.isPending}
          >
            {signUpMutation.isPending ? "Signing up..." : "Sign Up"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
