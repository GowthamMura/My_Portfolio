import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "../layouts/UserLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import ProtectedRoute from "../components/common/ProtectedRoute.jsx";

import HomePage from "../pages/user/HomePage.jsx";
import ProjectsPage from "../pages/user/ProjectsPage.jsx";
import BlogsPage from "../pages/user/BlogsPage.jsx";

import AdminLoginPage from "../pages/admin/AdminLoginPage.jsx";
import AdminForgotPasswordPage from "../pages/admin/AdminForgotPasswordPage.jsx";
import AdminResetPasswordPage from "../pages/admin/AdminResetPasswordPage.jsx";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage.jsx";
import AdminProjectsPage from "../pages/admin/AdminProjectsPage.jsx";
import AdminSkillsPage from "../pages/admin/AdminSkillsPage.jsx";
import AdminBlogsPage from "../pages/admin/AdminBlogsPage.jsx";
import AdminContactsPage from "../pages/admin/AdminContactsPage.jsx";
import AdminProfilePage from "../pages/admin/AdminProfilePage.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User */}
        <Route
          path="/"
          element={
            <UserLayout>
              <HomePage />
            </UserLayout>
          }
        />
        <Route
          path="/projects"
          element={
            <UserLayout>
              <ProjectsPage />
            </UserLayout>
          }
        />
        <Route
          path="/blogs"
          element={
            <UserLayout>
              <BlogsPage />
            </UserLayout>
          }
        />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/forgot-password" element={<AdminForgotPasswordPage />} />
        <Route path="/admin/reset-password/:token" element={<AdminResetPasswordPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDashboardPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminProjectsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/skills"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminSkillsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminBlogsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminContactsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminProfilePage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
