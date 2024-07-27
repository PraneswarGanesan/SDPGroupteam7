// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import AdminDashboard from './components/dashboards/AdminDashboard/AdminDashboard';
import EmployeeDashboard from './components/dashboards/EmployeeDashboard/EmployeeDashboard';
import HRDashboard from './components/dashboards/HRDashboard/HRDashboard';
import TeamLeadDashboard from './components/dashboards/TeamLeadDashboard/TeamLeadDashboard';
import ProductManagerDashboard from './components/dashboards/ProductManagerDashboard/ProductManagerDashboard';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userInfo) => {
    setUser(userInfo);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/admin-dashboard/*" element={user?.role === 'admin' ? <AdminDashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/employee-dashboard/*" element={user?.role === 'employee' ? <EmployeeDashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/hr-dashboard/*" element={user?.role === 'hr' ? <HRDashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/team-lead-dashboard/*" element={user?.role === 'team_lead' ? <TeamLeadDashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/product-manager-dashboard/*" element={user?.role === 'product_manager' ? <ProductManagerDashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
        <Route path="/home" element={<Home user={user} onLogout={handleLogout} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
