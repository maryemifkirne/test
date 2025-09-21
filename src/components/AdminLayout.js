import React, { useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/admin/dashboard' },
    { id: 'services', label: 'Services', icon: '🏢', path: '/admin/services' },
    { id: 'formations', label: 'Formations', icon: '📚', path: '/admin/formations' },
    { id: 'users', label: 'Utilisateurs', icon: '👥', path: '/admin/users' },
    { id: 'reports', label: 'Rapports', icon: '📈', path: '/admin/reports' }
  ];

  return (
    <div className="admin-layout">
      <div className="admin-header">
        <div className="admin-logo">
          <img src="/logo.jpeg" alt="Logo" style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
          <span>Academy pour Arbitrage</span>
        </div>
        <nav className="admin-nav">
          <Link to="/admin/dashboard" className="admin-nav-link">Dashboard</Link>
          <Link to="/admin/services" className="admin-nav-link">Services</Link>
          <Link to="/admin/formations" className="admin-nav-link">Formations</Link>
          <Link to="/admin/users" className="admin-nav-link">Utilisateurs</Link>
          <Link to="/admin/reports" className="admin-nav-link">Rapports</Link>
        </nav>
        <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
      </div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;