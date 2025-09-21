import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavigation from '../components/AdminNavigation';
import { MdQrCode, MdPeople, MdAdd, MdVisibility, MdAccessTime } from 'react-icons/md';

const AdminPresence = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [presences, setPresences] = useState([]);
  const [formData, setFormData] = useState({
    formation_id: 1,
    date_session: '',
    heure_debut: '',
    heure_fin: ''
  });

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!token || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchSessions();
  }, [token, user.role, navigate]);

  const fetchSessions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/presence/sessions/active');
      setSessions(response.data);
    } catch (error) {
      console.error('Erreur sessions:', error);
    }
  };

  const createSession = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/presence/session/create', formData);
      setShowCreateForm(false);
      setFormData({ formation_id: 1, date_session: '', heure_debut: '', heure_fin: '' });
      fetchSessions();
      
      // Afficher le QR code
      const newWindow = window.open('', '_blank');
      newWindow.document.write(`
        <html>
          <head><title>QR Code Session</title></head>
          <body style="text-align: center; padding: 40px; font-family: Arial;">
            <h2>QR Code de Présence</h2>
            <p>Session: ${response.data.session.code_session}</p>
            <img src="${response.data.qr_code}" style="width: 300px; height: 300px;" />
            <p>Scannez ce code pour marquer votre présence</p>
          </body>
        </html>
      `);
    } catch (error) {
      console.error('Erreur création session:', error);
    }
  };

  const viewPresences = async (sessionId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/presence/session/${sessionId}/presences`);
      setPresences(response.data);
      setSelectedSession(sessionId);
    } catch (error) {
      console.error('Erreur présences:', error);
    }
  };

  if (!token || user.role !== 'admin') {
    return <div>Accès refusé</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--light-gray)' }}>
      <AdminNavigation />
      
      <div className="admin-header">
        <h1>Gestion des Présences</h1>
        <p>Système moderne de présence avec QR codes</p>
      </div>

      <div className="admin-content">
        {/* Bouton créer session */}
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            style={{
              background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-gold))',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: '0 auto'
            }}
          >
            <MdAdd /> Créer une session
          </button>
        </div>

        {/* Formulaire création session */}
        {showCreateForm && (
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            marginBottom: '30px',
            maxWidth: '600px',
            margin: '0 auto 30px auto'
          }}>
            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '20px' }}>
              <MdQrCode /> Nouvelle Session de Formation
            </h3>
            <form onSubmit={createSession}>
              <div style={{ display: 'grid', gap: '15px' }}>
                <input
                  type="date"
                  value={formData.date_session}
                  onChange={(e) => setFormData({...formData, date_session: e.target.value})}
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                  required
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <input
                    type="time"
                    value={formData.heure_debut}
                    onChange={(e) => setFormData({...formData, heure_debut: e.target.value})}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                    required
                  />
                  <input
                    type="time"
                    value={formData.heure_fin}
                    onChange={(e) => setFormData({...formData, heure_fin: e.target.value})}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    background: 'var(--accent-green)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Créer et Générer QR Code
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Liste des sessions */}
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
            <MdAccessTime style={{ fontSize: '24px' }} />
            <h2 style={{ margin: 0 }}>Sessions Actives ({sessions.length})</h2>
          </div>

          <div style={{ padding: '20px' }}>
            {sessions.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>
                Aucune session active
              </p>
            ) : (
              <div style={{ display: 'grid', gap: '16px' }}>
                {sessions.map((session) => (
                  <div key={session.id} style={{
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
                          {session.code_session}
                        </div>
                        <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                          Formation #{session.formation_id}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '4px' }}>
                          Date: {new Date(session.date_session).toLocaleDateString()}
                        </div>
                        <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                          {session.heure_debut} - {session.heure_fin}
                        </div>
                      </div>

                      <div>
                        <div style={{
                          fontSize: '18px',
                          fontWeight: '700',
                          color: 'var(--accent-green)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <MdPeople /> {session.nb_presents || 0} présents
                        </div>
                      </div>

                      <div>
                        <button
                          onClick={() => viewPresences(session.id)}
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
                          <MdVisibility /> Voir présences
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Liste des présences */}
        {selectedSession && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            marginTop: '20px',
            overflow: 'hidden'
          }}>
            <div style={{
              background: 'var(--accent-green)',
              color: 'white',
              padding: '15px 20px'
            }}>
              <h3 style={{ margin: 0 }}>Présences - Session {selectedSession}</h3>
            </div>
            <div style={{ padding: '20px' }}>
              {presences.map((presence) => (
                <div key={presence.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <div>
                    <div style={{ fontWeight: '600' }}>
                      {presence.prenom} {presence.nom}
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                      {presence.email}
                    </div>
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                    {new Date(presence.heure_presence).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPresence;