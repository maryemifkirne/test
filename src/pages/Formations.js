import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { MdSchool, MdAccessTime, MdPeople, MdShoppingCart, MdStar, MdPerson, MdTrendingUp, MdInfo } from 'react-icons/md';
import '../styles/modern.css';

const Formations = () => {
  const [formations, setFormations] = useState([]);
  const navigate = useNavigate();
  const { toasts, info, removeToast } = useToast();

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await axios.get('test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/public/formations');
        setFormations(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des formations:', error);
      }
    };
    fetchFormations();
  }, []);

  const handleAcheter = (formation) => {
    const token = localStorage.getItem('token');
    if (!token) {
      info('🔑 Vous devez vous connecter pour acheter cette formation');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    navigate('/paiement', { state: { type: 'formation', produit: formation } });
  };

  return (
    <div className="modern-page">
      <div className="modern-container">
        <h1 className="modern-title"><MdSchool /> Formations en Arbitrage</h1>
      
        <div className="modern-grid">
          {formations.length > 0 ? (
            formations.map(formation => (
              <div key={formation.id} className="modern-card">
                <div className="modern-badge"><MdSchool /> Formation</div>
                <h2 className="modern-subtitle">{formation.titre}</h2>
                <div className="modern-feature">
                  <MdAccessTime />
                  <span>Durée: {formation.duree}</span>
                </div>
                <div className="modern-feature">
                  <MdPeople />
                  <span>Public: {formation.public_cible}</span>
                </div>
                <p style={{ color: '#666', lineHeight: '1.6', margin: '15px 0' }}>
                  {formation.description}
                </p>
                {formation.prix && (
                  <div className="modern-price">{formation.prix} €</div>
                )}
                <button 
                  className="modern-btn modern-btn-primary"
                  onClick={() => handleAcheter(formation)}
                  style={{ marginTop: '15px' }}
                >
                  <MdShoppingCart /> Acheter cette formation
                </button>
              </div>
            ))
          ) : (
            <div className="modern-card">
              <div className="modern-badge"><MdInfo /> Information</div>
              <h2 className="modern-subtitle">Formations par défaut</h2>
              <p>Aucune formation configurée. Contactez l'administrateur.</p>
            </div>
          )}
        </div>
      
        
        <div className="modern-card" style={{ marginTop: '30px', textAlign: 'center' }}>
          <h2 className="modern-subtitle"><MdStar /> Pourquoi choisir nos formations ?</h2>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            Développez vos compétences en arbitrage avec nos formations spécialisées, 
            conçues pour les professionnels du droit et les futurs arbitres.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div className="modern-feature">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{width: '16px', height: '16px', marginRight: '8px'}}>
                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
              </svg>
              <span>Formations certifiées</span>
            </div>
            <div className="modern-feature">
              <span>👨‍🏫</span>
              <span>Experts reconnus</span>
            </div>
            <div className="modern-feature">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{width: '16px', height: '16px', marginRight: '8px'}}>
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
              <span>Suivi personnalisé</span>
            </div>
          </div>
        </div>
      
        
        {/* Toasts */}
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Formations;
