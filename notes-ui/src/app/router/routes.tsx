import MainLayout from "@/features/auth/MainLayout";
import AuthPage from "@/features/auth/pages/AuthPage";
import NotFoundPage from "@/features/common/pages/NotFoundPage";
import NotesPage from "@/features/notes/pages/NotesPage";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
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
