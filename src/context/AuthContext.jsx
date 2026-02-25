import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const savedUser = localStorage.getItem('phish_admin_session');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    // Basic mock authentication
    if (trimmedEmail === 'admin@security.com' && trimmedPassword === 'admin123') {
      const userData = { email: trimmedEmail, role: 'admin', id: '1' };
      setUser(userData);
      localStorage.setItem('phish_admin_session', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('phish_admin_session');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading: loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
