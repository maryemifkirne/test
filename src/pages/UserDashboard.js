import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdShoppingCart, MdSchool, MdVerifiedUser, MdCheck, MdPending, MdQrCodeScanner } from 'react-icons/md';
import { useLanguage } from '../hooks/useLanguage';
import QRScanner from '../components/QRScanner';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [achats, setAchats] = useState([]);
  const [formations, setFormations] = useState([]);
  const [certificats, setCertificats] = useState([]);
  const [activeTab, setActiveTab] = useState('achats');
  const [loading, setLoading] = useState(true);
  const [showQRScanner, setShowQRScanner] = useState(null);
  const { t } = useLanguage();

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      const headers = { 
        Authorization: `Bearer ${token}`,
        'user-id': user.id 
      };

      console.log('Fetching data for user:', user.id);

      const [achatsRes, formationsRes, certificatsRes] = await Promise.all([
        axios.get('test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/user/mes-achats', { headers }),
        axios.get('test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/user/mes-formations', { headers }),
        axios.get('test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/user/mes-certificats', { headers })
      ]);

      console.log('Achats:', achatsRes.data);
      console.log('Formations:', formationsRes.data);
      console.log('Certificats:', certificatsRes.data);

      setAchats(achatsRes.data);
      setFormations(formationsRes.data);
      setCertificats(certificatsRes.data);
    } catch (error) {
      console.error('Erreur complète:', error);
      console.error('Response:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const marquerReglementLu = async (formationId) => {
    try {
      await axios.post(`test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/user/formation/${formationId}/reglement`, {}, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'user-id': user.id 
        }
      });
      fetchData();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const confirmerPresence = async (formationId) => {
    try {
      const response = await axios.post(`test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/user/formation/${formationId}/presence`, {}, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'user-id': user.id 
        }
      });
      
      if (response.data.certificat_genere) {
        alert('Félicitations ! Votre certificat a été généré et est en attente de validation.');
      }
      fetchData();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (!token) {
    return <div>Accès refusé</div>;
  }

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>{t('myPersonalSpace')}</h1>
        <p>{t('followTrainings')}</p>
      </div>

      {/* Navigation */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '30px',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        {[
          { key: 'achats', label: t('myPurchases'), icon: <MdShoppingCart /> },
          { key: 'formations', label: t('myTrainings'), icon: <MdSchool /> },
          { key: 'certificats', label: t('myCertificates'), icon: <MdVerifiedUser /> }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              background: activeTab === tab.key ? 'var(--primary-blue)' : 'white',
              color: activeTab === tab.key ? 'white' : 'var(--text-dark)',
              border: '2px solid var(--primary-blue)',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '500'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>{t('loading')}</div>
      ) : (
        <div>
          {/* Mes Achats */}
          {activeTab === 'achats' && (
            <div>
              <h2>{t('myPurchases')} ({achats.length})</h2>
              {achats.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>
                  {t('noPurchasesFound')}
                </p>
              ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {achats.map(achat => (
                    <div key={achat.id} style={{
                      background: 'white',
                      padding: '20px',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      border: '1px solid #e9ecef'
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div>
                          <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                            {achat.type_produit} #{achat.produit_id}
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                            {achat.transaction_id}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: 'var(--accent-green)' }}>
                            {achat.prix} DH
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                            {achat.methode_paiement}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                            {new Date(achat.date_paiement).toLocaleDateString()}
                          </div>
                          <div style={{ 
                            fontSize: '12px', 
                            padding: '2px 8px',
                            borderRadius: '12px',
                            backgroundColor: achat.statut_paiement === 'reussi' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            color: achat.statut_paiement === 'reussi' ? 'var(--accent-green)' : 'var(--error)',
                            width: 'fit-content'
                          }}>
                            {achat.statut_paiement}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Mes Formations */}
          {activeTab === 'formations' && (
            <div>
              <h2>{t('myTrainings')} ({formations.length})</h2>
              {formations.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>
                  {t('noTrainingsFound')}
                </p>
              ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {formations.map(formation => (
                    <div key={formation.id} style={{
                      background: 'white',
                      padding: '20px',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      border: '1px solid #e9ecef'
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                            Formation #{formation.produit_id}
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                            Prix: {formation.prix} DH
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                            ✓ Règlement: {formation.reglement_lu ? 'Lu' : 'Non lu'}
                          </div>
                          <div style={{ fontSize: '14px' }}>
                            ✓ Présence: {formation.presence_confirmee ? 'Confirmée' : 'Non confirmée'}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                          {!formation.reglement_lu && (
                            <button
                              onClick={() => marquerReglementLu(formation.formation_id)}
                              style={{
                                background: 'var(--primary-blue)',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '14px'
                              }}
                            >
                              {t('readRegulations')}
                            </button>
                          )}
                          {formation.reglement_lu && !formation.presence_confirmee && (
                            <button
                              onClick={() => setShowQRScanner(formation.formation_id)}
                              style={{
                                background: 'var(--accent-green)',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <MdQrCodeScanner /> Scanner QR
                            </button>
                          )}
                          {formation.reglement_lu && formation.presence_confirmee && (
                            <div style={{ 
                              color: 'var(--accent-green)', 
                              fontSize: '14px', 
                              fontWeight: '600',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <MdCheck /> {t('trainingCompleted')}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Mes Certificats */}
          {activeTab === 'certificats' && (
            <div>
              <h2>{t('myCertificates')} ({certificats.length})</h2>
              {certificats.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>
                  {t('noCertificatesFound')}
                </p>
              ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {certificats.map(certificat => (
                    <div key={certificat.id} style={{
                      background: 'white',
                      padding: '20px',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      border: '1px solid #e9ecef'
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                            {certificat.formation_titre}
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                            N° {certificat.numero_certificat}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                            Formation: {new Date(certificat.date_formation).toLocaleDateString()}
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                            Émis: {new Date(certificat.date_emission).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <div style={{ 
                            fontSize: '14px', 
                            padding: '4px 12px',
                            borderRadius: '12px',
                            backgroundColor: certificat.statut === 'valide' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                            color: certificat.statut === 'valide' ? 'var(--accent-green)' : 'var(--primary-gold)',
                            width: 'fit-content',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            {certificat.statut === 'valide' ? <MdCheck /> : <MdPending />}
                            {certificat.statut}
                          </div>
                        </div>
                        <div>
                          {certificat.statut === 'valide' && (
                            <button
                              onClick={() => window.open(`test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/admin/certificat-pdf/${certificat.id}`, '_blank')}
                              style={{
                                background: 'var(--primary-blue)',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '14px'
                              }}
                            >
                              {t('download')}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowQRScanner(null)}
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                background: 'var(--error)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                fontSize: '18px',
                zIndex: 1001
              }}
            >
              ×
            </button>
            <QRScanner 
              userId={user.id}
              onSuccess={() => {
                setShowQRScanner(null);
                fetchData();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
