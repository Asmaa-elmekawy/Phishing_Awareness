import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/admin/Login';
import Register from './pages/admin/Register';
import DashboardOverview from './pages/admin/DashboardOverview';
import Home from './pages/website/Home';
import Lessons from './pages/website/Lessons';
import Simulations from './pages/website/Simulations';
import Analytics from './pages/website/Analytics';

import Sidebar from './pages/admin/components/common/Sidebar';
import Header from './pages/admin/components/common/Header';

import LessonsPage from './pages/admin/LessonsPage';
import QuestionsPage from './pages/admin/QuestionsPage';
import ProfilePage from './pages/admin/ProfilePage';
import LessonDetailPage from './pages/admin/LessonDetailPage';
import QuestionDetailPage from './pages/admin/QuestionDetailPage';
import { ROUTES_ADMIN } from './constants/routes';
import UserSettings from './pages/admin/UserSettings';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return <Navigate to={ROUTES_ADMIN.AUTH.LOGIN} replace />;
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
        <main className="flex-1 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/simulations" element={<Simulations />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path={ROUTES_ADMIN.AUTH.LOGIN} element={<Login />} />
        <Route path={ROUTES_ADMIN.AUTH.REGISTER} element={<Register />} />

        <Route
          path={ROUTES_ADMIN.PROFILE.INFO}
          element={
            <ProtectedRoute>
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
            <ProtectedRoute>
              <MainLayout>
                <DashboardOverview />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES_ADMIN.LESSONS.LIST}
          element={
            <ProtectedRoute>
              <MainLayout>
                <LessonsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES_ADMIN.LESSONS.DETAILS}
          element={
            <ProtectedRoute>
              <MainLayout>
                <LessonDetailPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES_ADMIN.QUESTIONS.LIST}
          element={
            <ProtectedRoute>
              <MainLayout>
                <QuestionsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES_ADMIN.QUESTIONS.DETAILS}
          element={
            <ProtectedRoute>
              <MainLayout>
                <QuestionDetailPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES_ADMIN.SETTINGS.USER_SETTINGS}
          element={
            <ProtectedRoute>
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
