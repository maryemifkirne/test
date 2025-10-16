import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavigation from '../components/AdminNavigation';
import '../App.css';

const AdminPanel = ({ activeTab: initialTab = 'services' }) => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [formations, setFormations] = useState([]);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Vérification des permissions
  useEffect(() => {
    if (!token || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    setActiveTab(initialTab);
  }, [token, user.role, navigate, initialTab]);

  useEffect(() => {
    fetchServices();
    fetchFormations();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/admin/services', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Services reçus:', response.data);
      setServices(response.data);
    } catch (error) {
      console.error('Erreur services:', error);
      setServices([]);
    }
  };

  const fetchFormations = async () => {
    try {
      const response = await axios.get('test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/admin/formations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Formations reçues:', response.data);
      setFormations(response.data);
    } catch (error) {
      console.error('Erreur formations:', error);
      setFormations([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = activeTab === 'services' ? 'services' : 'formations';
      if (editingItem) {
        await axios.put(`test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/admin/${url}/${editingItem.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/admin/${url}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setFormData({});
      setEditingItem(null);
      activeTab === 'services' ? fetchServices() : fetchFormations();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const url = activeTab === 'services' ? 'services' : 'formations';
      await axios.delete(`test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/admin/${url}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      activeTab === 'services' ? fetchServices() : fetchFormations();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
  };

  if (!token || user.role !== 'admin') {
    return <div>Accès refusé</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--light-gray)' }}>
      <AdminNavigation />
      
      <div className="admin-header">
        <h1>Panneau d'Administration</h1>
        <p>Gestion des {activeTab === 'services' ? 'Services' : 'Formations'}</p>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <div className="admin-content">
        <div className="admin-form-section">
          <div className="service-card">
            <h2>{editingItem ? 'Modifier' : 'Ajouter'} {activeTab === 'services' ? 'Service' : 'Formation'}</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>{activeTab === 'services' ? 'Nom' : 'Titre'}</label>
                <input
                  type="text"
                  value={formData.titre || formData.nom || ''}
                  onChange={(e) => setFormData({...formData, [activeTab === 'services' ? 'nom' : 'titre']: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>

              {activeTab === 'services' && (
                <>
                  <div className="form-group">
                    <label>Type</label>
                    <select
                      value={formData.type || 'arbitrage'}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                    >
                      <option value="arbitrage">Arbitrage</option>
                      <option value="mediation">Médiation</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Prix de base (DH)</label>
                    <input
                      type="number"
                      value={formData.prix_base || ''}
                      onChange={(e) => setFormData({...formData, prix_base: e.target.value})}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Prix (DH)</label>
                    <input
                      type="number"
                      value={formData.prix || ''}
                      onChange={(e) => setFormData({...formData, prix: e.target.value})}
                    />
                  </div>
                </>
              )}

              {activeTab === 'formations' && (
                <>
                  <div className="form-group">
                    <label>Durée</label>
                    <input
                      type="text"
                      value={formData.duree || ''}
                      onChange={(e) => setFormData({...formData, duree: e.target.value})}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Public cible</label>
                    <input
                      type="text"
                      value={formData.public_cible || ''}
                      onChange={(e) => setFormData({...formData, public_cible: e.target.value})}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Prix (DH)</label>
                    <input
                      type="number"
                      value={formData.prix || ''}
                      onChange={(e) => setFormData({...formData, prix: e.target.value})}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={formData.date || ''}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                </>
              )}
              
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingItem ? 'Modifier' : 'Ajouter'}
                </button>
                {editingItem && (
                  <button 
                    type="button" 
                    onClick={() => {setEditingItem(null); setFormData({});}} 
                    className="btn-secondary"
                  >
                    Annuler
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="admin-list-section">
          <h2>Liste des {activeTab === 'services' ? 'Services' : 'Formations'}</h2>
          <div className="admin-grid">
            {(activeTab === 'services' ? services : formations).map(item => (
              <div key={item.id} className="admin-item-card">
                <div className="admin-item-header">
                  <div className="admin-item-icon">
                    {activeTab === 'services' ? (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                      </svg>
                    )}
                  </div>
                  <h3>{item.titre}</h3>
                </div>
                <p>{item.description}</p>
                {activeTab === 'services' && (
                  <div className="service-details">
                    <span className="type">{item.type}</span>
                    <span className="price">{item.prix} DH</span>
                  </div>
                )}
                {activeTab === 'formations' && (
                  <div className="formation-details">
                    <span className="duration">{item.duree}</span>
                    <span className="date">{item.date}</span>
                    <span className="price">{item.prix} DH</span>
                  </div>
                )}
                <div className="admin-item-actions">
                  <button onClick={() => handleEdit(item)} className="btn-edit">
                    Modifier
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="btn-delete">
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
