import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/admin/Login';
import Register from './pages/admin/Register';
import DashboardOverview from './pages/admin/DashboardOverview';
import Home from './pages/Home';

import Sidebar from './pages/admin/components/common/Sidebar';
import Header from './pages/admin/components/common/Header';

import LessonsPage from './pages/admin/LessonsPage';
import QuestionsPage from './pages/admin/QuestionsPage';
import ProfilePage from './pages/admin/ProfilePage';
import { ROUTES_ADMIN } from './constants/routes';

const ProtectedRoute = ({ children }) => {
  // Auth is intentionally not wired until backend integration.
  // Keep the routing + layout structure unchanged.
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
  const [lessons, setLessons] = useState([]);
  const [questions, setQuestions] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={ROUTES_ADMIN.AUTH.LOGIN} element={<Login />} />
        <Route path={ROUTES_ADMIN.AUTH.REGISTER} element={<Register />} />
         <Route path={ROUTES_ADMIN.PROFILE.INFO} element={<ProfilePage />} />

        {/* Admin Routes */}
        <Route
          path={ROUTES_ADMIN.DASHBOARD}
          element={
            <ProtectedRoute>
              <MainLayout>
                <DashboardOverview lessons={lessons} questions={questions} />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES_ADMIN.LESSONS.LIST}
          element={
            <ProtectedRoute>
              <MainLayout>
                <LessonsPage
                  lessons={lessons}
                  setLessons={setLessons}
                  questions={questions}
                  setQuestions={setQuestions}
                />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES_ADMIN.QUESTIONS.LIST}
          element={
            <ProtectedRoute>
              <MainLayout>
                <QuestionsPage
                  lessons={lessons}
                  setLessons={setLessons}
                  questions={questions}
                  setQuestions={setQuestions}
                />
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
