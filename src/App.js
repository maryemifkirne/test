import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/admin.css';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UserDashboard from './pages/UserDashboard';
import Profile from './pages/Profile';
import Services from './pages/Services';
import Formations from './pages/Formations';
import AdminPanel from './pages/AdminPanel';
import AdminDashboard from './pages/AdminDashboard';
import AdminEncaissements from './pages/AdminEncaissements';
import AdminCertificats from './pages/AdminCertificats';
import AdminPresence from './pages/AdminPresence';
import AdminUsers from './pages/AdminUsers';
import AdminCoupons from './pages/AdminCoupons';
import Paiement from './pages/Paiement';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin/*" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="services" element={<AdminPanel activeTab="services" />} />
          <Route path="formations" element={<AdminPanel activeTab="formations" />} />
          <Route path="encaissements" element={<AdminEncaissements />} />
          <Route path="certificats" element={<AdminCertificats />} />
          <Route path="presence" element={<AdminPresence />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="coupons" element={<AdminCoupons />} />
        </Route>
        <Route path="/*" element={
          <>
            <Navbar />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/services" element={<Services />} />
                <Route path="/formations" element={<Formations />} />
                <Route path="/paiement" element={<Paiement />} />
              </Routes>
            </div>
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;