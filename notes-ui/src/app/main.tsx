import { AuthProvider } from "@/features/auth/context/AuthProvider";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import queryClient from "./queryClient";
import AppRoutes from "./router/routes";
import getTheme from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={getTheme()}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
