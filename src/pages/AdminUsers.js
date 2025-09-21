import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavigation from '../components/AdminNavigation';
import { MdPeople, MdEdit, MdDelete, MdAdd } from 'react-icons/md';

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!token || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchUsers();
  }, [token, user.role, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur users:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'var(--error)';
      case 'arbitre': return 'var(--primary-blue)';
      case 'client': return 'var(--accent-green)';
      default: return 'var(--text-light)';
    }
  };

  if (!token || user.role !== 'admin') {
    return <div>Accès refusé</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--light-gray)' }}>
      <AdminNavigation />
      
      <div className="admin-header">
        <h1>Gestion des Utilisateurs</h1>
        <p>Liste et gestion de tous les utilisateurs</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Chargement...</div>
      ) : (
        <div className="admin-content">
          <div style={{ 
            background: 'white', 
            borderRadius: '16px', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <div style={{ 
              background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-gold))',
              color: 'white',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <MdPeople style={{ fontSize: '24px' }} />
              <h2 style={{ margin: 0 }}>Utilisateurs ({users.length})</h2>
            </div>

            <div style={{ padding: '20px' }}>
              {users.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>
                  Aucun utilisateur trouvé
                </p>
              ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {users.map((utilisateur) => (
                    <div key={utilisateur.id} style={{
                      border: '1px solid #e9ecef',
                      borderRadius: '12px',
                      padding: '20px',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                        gap: '16px',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ fontWeight: '600', color: 'var(--text-dark)', marginBottom: '4px' }}>
                            {utilisateur.prenom} {utilisateur.nom}
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                            ID: {utilisateur.id}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontWeight: '500', color: 'var(--text-dark)', marginBottom: '4px' }}>
                            {utilisateur.email}
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                            {utilisateur.telephone || 'Pas de téléphone'}
                          </div>
                        </div>

                        <div>
                          <div style={{ 
                            fontSize: '14px', 
                            padding: '4px 12px',
                            borderRadius: '12px',
                            backgroundColor: `${getRoleColor(utilisateur.role)}20`,
                            color: getRoleColor(utilisateur.role),
                            textTransform: 'uppercase',
                            fontWeight: '600',
                            width: 'fit-content',
                            marginBottom: '4px'
                          }}>
                            {utilisateur.role}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                            Inscrit: {new Date(utilisateur.date_creation).toLocaleDateString()}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '4px' }}>
                            Fonction: {utilisateur.fonction || 'Non renseignée'}
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                            Études: {utilisateur.niveau_etude || 'Non renseigné'}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            style={{
                              background: 'var(--primary-blue)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '8px 12px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '12px'
                            }}
                          >
                            <MdEdit /> Modifier
                          </button>
                          <button
                            style={{
                              background: 'var(--error)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '8px 12px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '12px'
                            }}
                          >
                            <MdDelete /> Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;