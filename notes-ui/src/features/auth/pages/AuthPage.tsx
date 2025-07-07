import NoteLogo from "@/components/icons/NoteLogo";
import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default function AuthPage() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="background.default"
      sx={{ height: "100%", width: "100%" }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          minWidth: 350,
          maxWidth: 400,
          width: "100%",
          overflow: "hidden",
          minHeight: 420,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <NoteLogo />
        </Box>
        {showSignUp ? (
          <>
            <SignUpForm />
            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
              Already have an account?{" "}
              <Typography
                component="span"
                sx={{
                  color: "primary.main",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontWeight: 500,
                }}
                onClick={() => setShowSignUp(false)}
              >
                Log in
              </Typography>
            </Typography>
          </>
        ) : (
          <>
            <LoginForm />
            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Typography
                component="span"
                sx={{
                  color: "primary.main",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontWeight: 500,
                }}
                onClick={() => setShowSignUp(true)}
              >
                Create one
              </Typography>
            </Typography>
          </>
        )}
      </Paper>
    </Box>
  );
}
