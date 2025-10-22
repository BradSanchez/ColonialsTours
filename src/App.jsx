
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from '../src/Components/Landing';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/#" element={<Landing />} />
        <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
