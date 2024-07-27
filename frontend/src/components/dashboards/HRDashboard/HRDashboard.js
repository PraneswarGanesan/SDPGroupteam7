// src/components/dashboards/HRDashboard/HRDashboard.js
import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import HRSidePanel from './HRSidePanel';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import LeaveRequest from './components/LeaveRequests'; // Ensure correct naming and import
import ManageEmployees from './components/ManageEmployees'; // Ensure correct naming and import

const HRDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <HRSidePanel />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leave-requests" element={<LeaveRequest />} />
          <Route path="manage-employees" element={<ManageEmployees />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default HRDashboard;
