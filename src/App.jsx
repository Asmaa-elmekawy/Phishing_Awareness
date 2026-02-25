import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Login from './pages/admin/Login';
import DashboardOverview from './pages/admin/DashboardOverview';
import Home from './pages/Home';

import Sidebar from './pages/admin/components/common/Sidebar';
import Header from './pages/admin/components/common/Header';

import LessonsPage from './pages/admin/LessonsPage';
import QuestionsPage from './pages/admin/QuestionsPage';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-bg">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyber-primary"></div>
    </div>
  );

  if (!user) return <Navigate to="/login" />;

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
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <DashboardOverview />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/lessons"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <LessonsPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/questions"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <QuestionsPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
