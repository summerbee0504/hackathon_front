import '../styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Top from '../pages/Top';
import React from 'react';
import { AuthProvider } from '../components/AuthContext';
import Signup from './Signup';
import Dashboard from './Dashboard';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
