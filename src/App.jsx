
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Landing from './Components/Landing';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import AdminDashboard from './Components/AdminDashboard';
import Tours from './Components/Tours';
import Mapa from './Components/Mapa';

function AppContent() {
  const location = useLocation();
  const hideNavFooter = ['/login', '/register', '/admin'].includes(location.pathname);

  return (
    <>
      {!hideNavFooter && <Navbar />}
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
        <Route path="/mapa" element={<Mapa />} />
      </Routes>
      {!hideNavFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
