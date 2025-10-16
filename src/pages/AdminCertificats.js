import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavigation from '../components/AdminNavigation';
import { MdVerifiedUser, MdCheck, MdPending, MdCancel } from 'react-icons/md';

const AdminCertificats = () => {
  const navigate = useNavigate();
  const [certificats, setCertificats] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!token || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchCertificats();
  }, [token, user.role, navigate]);

  const fetchCertificats = async () => {
    try {
      const response = await axios.get('test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/admin/certificats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCertificats(response.data);
    } catch (error) {
      console.error('Erreur certificats:', error);
    } finally {
      setLoading(false);
    }
  };

  const validerCertificat = async (id) => {
    try {
      await axios.put(`test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/admin/certificats/${id}/valider`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCertificats();
    } catch (error) {
      console.error('Erreur validation:', error);
    }
  };

  const getStatutColor = (statut) => {
    switch (statut) {
      case 'valide': return 'var(--accent-green)';
      case 'en_attente': return 'var(--primary-gold)';
      case 'annule': return 'var(--error)';
      default: return 'var(--text-light)';
    }
  };

  const getStatutIcon = (statut) => {
    switch (statut) {
      case 'valide': return <MdCheck />;
      case 'en_attente': return <MdPending />;
      case 'annule': return <MdCancel />;
      default: return <MdPending />;
    }
  };

  if (!token || user.role !== 'admin') {
    return <div>Accès refusé</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--light-gray)' }}>
      <AdminNavigation />
      
      <div className="admin-header">
        <h1>Gestion des Certificats</h1>
        <p>Validation et suivi des certificats de formation</p>
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
              <MdVerifiedUser style={{ fontSize: '24px' }} />
              <h2 style={{ margin: 0 }}>Certificats ({certificats.length})</h2>
            </div>

            <div style={{ padding: '20px' }}>
              {certificats.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>
                  Aucun certificat trouvé
                </p>
              ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {certificats.map((certificat) => (
                    <div key={certificat.id} style={{
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
                            {certificat.nom_complet}
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                            {certificat.email}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontWeight: '600', color: 'var(--text-dark)', marginBottom: '4px' }}>
                            {certificat.formation_titre}
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                            N° {certificat.numero_certificat}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '4px' }}>
                            Date formation: {new Date(certificat.date_formation).toLocaleDateString()}
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                            Demandé: {new Date(certificat.date_creation).toLocaleDateString()}
                          </div>
                        </div>

                        <div>
                          <div style={{ 
                            fontSize: '14px', 
                            padding: '4px 12px',
                            borderRadius: '12px',
                            backgroundColor: `${getStatutColor(certificat.statut)}20`,
                            color: getStatutColor(certificat.statut),
                            textTransform: 'uppercase',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            width: 'fit-content',
                            marginBottom: '8px'
                          }}>
                            {getStatutIcon(certificat.statut)} {certificat.statut}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                            ✓ Règlement: {certificat.reglement_complete ? 'Oui' : 'Non'}
                            <br />
                            ✓ Présence: {certificat.presence_complete ? 'Oui' : 'Non'}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                          {certificat.statut === 'en_attente' && (
                            <button
                              onClick={() => validerCertificat(certificat.id)}
                              style={{
                                background: 'var(--accent-green)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '8px 16px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '14px'
                              }}
                            >
                              <MdCheck /> Valider
                            </button>
                          )}
                          <button
                            onClick={() => window.open(`test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/admin/certificat-pdf/${certificat.id}`, '_blank')}
                            style={{
                              background: 'var(--primary-blue)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '8px 16px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '14px'
                            }}
                          >
                            <MdVerifiedUser /> Certificat
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

export default AdminCertificats;
