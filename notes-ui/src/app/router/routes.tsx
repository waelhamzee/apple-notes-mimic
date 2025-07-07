import { useAuth } from "@/features/auth/hooks/useAuth";
import MainLayout from "@/features/auth/MainLayout";
import AuthPage from "@/features/auth/pages/AuthPage";
import NotFoundPage from "@/features/common/pages/NotFoundPage";
import NotesPage from "@/features/notes/pages/NotesPage";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const RootRedirect = () => {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? "/notes" : "/auth"} replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route
        path="/auth"
        element={
          <MainLayout>
            <AuthPage />
          </MainLayout>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route path="/notes" element={<NotesPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
