import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
        </svg>
      )
    },
    {
      path: '/admin/services',
      label: 'Services',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
        </svg>
      )
    },
    {
      path: '/admin/formations',
      label: 'Formations',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
        </svg>
      )
    },

    {
      path: '/admin/encaissements',
      label: 'Encaissements',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
        </svg>
      )
    },
    {
      path: '/admin/certificats',
      label: 'Certificats',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,1L21,5V11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1M12,7C10.89,7 10,7.89 10,9A2,2 0 0,0 12,11A2,2 0 0,0 14,9C14,7.89 13.1,7 12,7M12,13C10.67,13 8,13.67 8,15V16H16V15C16,13.67 13.33,13 12,13Z"/>
        </svg>
      )
    },
    {
      path: '/admin/presence',
      label: 'Présences',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M3,5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5M9,7V9H7V11H9V13H11V11H13V9H11V7H9M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20Z"/>
        </svg>
      )
    },
    {
      path: '/admin/users',
      label: 'Utilisateurs',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2 1l-3 4v2h2l2.54-3.4L16.5 18H20zm-8.5 0v-7.5L9.87 8.66C9.53 8.26 9.03 8 8.5 8s-1.03.26-1.37.66L5.5 10.5V18h2v-6l1.5-1.5L10.5 18h1z"/>
        </svg>
      )
    },
    {
      path: '/admin/coupons',
      label: 'Coupons',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.79,21L3,11.21V2H11.21L21,11.79L12.79,21M5.5,4A1.5,1.5 0 0,1 7,5.5A1.5,1.5 0 0,1 5.5,7A1.5,1.5 0 0,1 4,5.5A1.5,1.5 0 0,1 5.5,4Z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="admin-navigation">
      <div className="admin-nav-header">
        <h2>Administration</h2>
      </div>
      <nav className="admin-nav-menu">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <div className="admin-nav-icon">
              {item.icon}
            </div>
            <span className="admin-nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminNavigation;