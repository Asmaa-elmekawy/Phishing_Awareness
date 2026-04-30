import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";
import DashboardOverview from "./pages/admin/DashboardOverview";
import Lessons from "./pages/website/Lessons";
import Simulations from "./pages/website/Simulations";
import Analytics from "./pages/website/Analytics";
import Ai from "./pages/website/Ai";
import Profile from "./pages/website/Profile";

import Sidebar from "./pages/admin/components/common/Sidebar";
import Header from "./pages/admin/components/common/Header";

import LessonsPage from "./pages/admin/LessonsPage";
import QuestionsPage from "./pages/admin/QuestionsPage";
import ProfilePage from "./pages/admin/ProfilePage";
import LessonDetailPage from "./pages/admin/LessonDetailPage";
import QuestionDetailPage from "./pages/admin/QuestionDetailPage";
import { ROUTES_ADMIN, ROUTES_WEBSITE } from "./constants/routes";
import authService from "./services/AdminServices/authService";
import UserSettings from "./pages/admin/UserSettings";
import Dashboard from "./pages/website/Dashboard";
import WebsiteLayout from "./pages/website/components/WebsiteLayout";
import WebsiteLogin from "./pages/website/Login";
import WebsiteRegister from "./pages/website/Register";
import Settings from "./pages/website/Settings";
import LessonQuestionsPage from "./pages/website/LessonQuestionsPage";
import ForgotPassword from "./pages/website/ForgotPassword";
import AdminForgotPassword from "./pages/admin/ForgotPassword";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to={requireAdmin ? ROUTES_ADMIN.AUTH.LOGIN : ROUTES_WEBSITE.AUTH.LOGIN} replace />;
  }

  if (requireAdmin) {
    const role = authService.getUserRole();
    if (role !== "Admin") {
      return <Navigate to={ROUTES_WEBSITE.DASHBOARD} replace />;
    }
  }

  return children;
};

const MainLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-cyber-bg text-cyber-text overflow-hidden relative">
      {/* Mobile Sidebar Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar isOpen={isMobileMenuOpen} />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header toggleSidebar={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        <main className="flex-1 overflow-y-auto w-full">{children}</main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WebsiteLogin />} />
        <Route
          path={ROUTES_WEBSITE.LESSONS}
          element={
            <WebsiteLayout>
              <Lessons />
            </WebsiteLayout>
          }
        />
        <Route
          path={ROUTES_WEBSITE.SIMULATIONS}
          element={
            <WebsiteLayout>
              <Simulations />
            </WebsiteLayout>
          }
        />
        <Route
          path={ROUTES_WEBSITE.ANALYTICS}
          element={
            <WebsiteLayout>
              <Analytics />
            </WebsiteLayout>
          }
        />
        <Route
          path={ROUTES_WEBSITE.DASHBOARD}
          element={
            <WebsiteLayout>
              <Dashboard />
            </WebsiteLayout>
          }
        />
        <Route
          path={ROUTES_WEBSITE.SETTINGS}
          element={
            <WebsiteLayout>
              <Settings />
            </WebsiteLayout>
          }
        />
        <Route
          path={ROUTES_WEBSITE.AI}
          element={
            <WebsiteLayout>
              <Ai />
            </WebsiteLayout>
          }
        />
        <Route
          path={ROUTES_WEBSITE.PROFILE}
          element={
            <WebsiteLayout>
              <Profile />
            </WebsiteLayout>
          }
        />
        <Route
          path={ROUTES_WEBSITE.LESSON_QUESTIONS}
          element={
            <WebsiteLayout>
              <LessonQuestionsPage />
            </WebsiteLayout>
          }
        />
        <Route path={ROUTES_WEBSITE.AUTH.LOGIN} element={<WebsiteLogin />} />
        <Route path={ROUTES_WEBSITE.AUTH.REGISTER} element={<WebsiteRegister />} />
        <Route path={ROUTES_WEBSITE.AUTH.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES_ADMIN.AUTH.LOGIN} element={<Login />} />
        <Route path={ROUTES_ADMIN.AUTH.REGISTER} element={<Register />} />
        <Route path={ROUTES_ADMIN.AUTH.FORGOT_PASSWORD} element={<AdminForgotPassword />} />

        <Route
          path={ROUTES_ADMIN.PROFILE.INFO}
          element={
            <ProtectedRoute requireAdmin={true}>
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path={ROUTES_ADMIN.DASHBOARD}
          element={
            <ProtectedRoute requireAdmin={true}>
              <MainLayout>
                <DashboardOverview />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES_ADMIN.LESSONS.LIST}
          element={
            <ProtectedRoute requireAdmin={true}>
              <MainLayout>
                <LessonsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES_ADMIN.LESSONS.DETAILS}
          element={
            <ProtectedRoute requireAdmin={true}>
              <MainLayout>
                <LessonDetailPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES_ADMIN.QUESTIONS.LIST}
          element={
            <ProtectedRoute requireAdmin={true}>
              <MainLayout>
                <QuestionsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES_ADMIN.QUESTIONS.DETAILS}
          element={
            <ProtectedRoute requireAdmin={true}>
              <MainLayout>
                <QuestionDetailPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES_ADMIN.SETTINGS.USER_SETTINGS}
          element={
            <ProtectedRoute requireAdmin={true}>
              <MainLayout>
                <UserSettings />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
