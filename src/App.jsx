import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/admin/Login';
import Register from './pages/admin/Register';
import DashboardOverview from './pages/admin/DashboardOverview';
import Home from './pages/website/Home';

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
  return (
    <div className="flex min-h-screen bg-cyber-bg text-cyber-text">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto">
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
