import React from 'react';
import '../App.css';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="container" style={{paddingTop: '40px', paddingBottom: '40px'}}>
      <div className="admin-header">
        <h1>Tableau de Bord</h1>
        {user.nom ? (
          <p>Bienvenue, {user.prenom} {user.nom} ({user.role})</p>
        ) : (
          <p>Veuillez vous connecter pour accéder au tableau de bord.</p>
        )}
      </div>

      <div className="dashboard-stats">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
          </div>
          <div className="dashboard-stat-content">
            <div className="dashboard-stat-number">12</div>
            <div className="dashboard-stat-label">Dossiers Actifs</div>
          </div>
        </div>
        
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
          <div className="dashboard-stat-content">
            <div className="dashboard-stat-number">8</div>
            <div className="dashboard-stat-label">Décisions Rendues</div>
          </div>
        </div>
        
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
          </div>
          <div className="dashboard-stat-content">
            <div className="dashboard-stat-number">4</div>
            <div className="dashboard-stat-label">En Attente</div>
          </div>
        </div>
        
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className="dashboard-stat-content">
            <div className="dashboard-stat-number">85%</div>
            <div className="dashboard-stat-label">Taux de Résolution</div>
          </div>
        </div>
      </div>

      <div className="dashboard-activity-section">
        <h2>Activité Récente</h2>
        <div className="dashboard-activity-card">
          <div className="dashboard-activity-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="dashboard-activity-content">
            <p>Aucune activité récente à afficher.</p>
            <p>Créez votre premier dossier d'arbitrage pour commencer.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;