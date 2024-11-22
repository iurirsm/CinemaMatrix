// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation/navigation';
import Profile from './pages/Profile';
import Homepage from './pages/Homepage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

