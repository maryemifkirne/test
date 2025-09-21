import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../App.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!token || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchStats();
    fetchUsers();
  }, [token, user.role, navigate]);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Stats reçues:', response.data);
      setStats(response.data);
    } catch (error) {
      console.error('Erreur stats:', error);
      setStats({ totalUsers: 0, activeCases: 0, totalServices: 0, totalFormations: 0 });
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Utilisateurs reçus:', response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur users:', error);
      setUsers([]);
    }
  };

  if (!token || user.role !== 'admin') {
    return <div>Accès refusé</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--light-gray)' }}>

      
      <div className="admin-header">
        <h1>Tableau de Bord Administrateur</h1>
        <p>Vue d'ensemble de la plateforme d'arbitrage</p>
      </div>
      
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2 1l-3 4v2h2l2.54-3.4L16.5 18H20zm-8.5 0v-7.5L9.87 8.66C9.53 8.26 9.03 8 8.5 8s-1.03.26-1.37.66L5.5 10.5V18h2v-6l1.5-1.5L10.5 18h1z"/>
            </svg>
          </div>
          <h3 className="stat-number">{stats.totalUsers || 0}</h3>
          <p className="stat-label">Utilisateurs Total</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
          </div>
          <h3 className="stat-number">{stats.activeCases || 0}</h3>
          <p className="stat-label">Dossiers Actifs</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
            </svg>
          </div>
          <h3 className="stat-number">{stats.totalServices || 0}</h3>
          <p className="stat-label">Services</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
            </svg>
          </div>
          <h3 className="stat-number">{stats.totalFormations || 0}</h3>
          <p className="stat-label">Formations</p>
          </div>
        </div>
      </div>

      <div className="dashboard-users-section">
        <h2>Utilisateurs Récents</h2>
        <div className="dashboard-users-grid">
          {users.length > 0 ? users.slice(0, 5).map(user => (
            <div key={user.id} className="dashboard-user-card">
              <div className="dashboard-user-avatar">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div className="dashboard-user-info">
                <div className="dashboard-user-name">{user.prenom} {user.nom}</div>
                <div className="dashboard-user-email">{user.email}</div>
                <div className={`dashboard-user-role role-${user.role}`}>{user.role}</div>
                {user.date_creation && (
                  <div className="dashboard-user-date" style={{fontSize: '12px', color: '#666', marginTop: '4px'}}>
                    Inscrit: {new Date(user.date_creation).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          )) : (
            <div style={{textAlign: 'center', padding: '40px', color: '#666'}}>
              <p>Aucun utilisateur trouvé dans la base de données</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;