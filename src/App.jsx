
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from '../src/Components/Landing';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/#" element={<Landing />} />
        <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
