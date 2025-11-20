
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import Landing from './Components/Landing';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import AdminDashboard from './Components/AdminDashboard';
import Tours from './Components/Tours';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/#" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/tours" element={<Tours />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
