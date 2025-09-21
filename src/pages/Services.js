import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { MdBusiness, MdLabel, MdShoppingCart, MdEmail, MdPhone, MdLocationOn, MdInfo } from 'react-icons/md';
import '../styles/modern.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const { toasts, info, removeToast } = useToast();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/public/services');
        setServices(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des services:', error);
      }
    };
    fetchServices();
  }, []);

  const handleAcheter = (service) => {
    const token = localStorage.getItem('token');
    if (!token) {
      info('🔑 Vous devez vous connecter pour acheter ce service');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    navigate('/paiement', { state: { type: 'service', produit: service } });
  };

  return (
    <div className="modern-page">
      <div className="modern-container">
        <h1 className="modern-title">
          <svg viewBox="0 0 24 24" fill="currentColor" style={{width: '24px', height: '24px', marginRight: '12px'}}>
            <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
          </svg>
          Nos Services d'Arbitrage
        </h1>
        
        <div className="modern-grid">
          {services.length > 0 ? (
            services.map(service => (
              <div key={service.id} className="modern-card">
                <div className="modern-badge">
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{width: '16px', height: '16px', marginRight: '8px'}}>
                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                  </svg>
                  Service
                </div>
                <h2 className="modern-subtitle">{service.nom}</h2>
                <p style={{ color: '#666', lineHeight: '1.6', margin: '15px 0' }}>
                  {service.description}
                </p>
                <div className="modern-feature">
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{width: '16px', height: '16px', marginRight: '8px'}}>
                    <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"/>
                  </svg>
                  <span>Type: {service.type}</span>
                </div>
                <div className="modern-price">{service.prix_base} €</div>
                <button 
                  className="modern-btn modern-btn-primary"
                  onClick={() => handleAcheter(service)}
                  style={{ marginTop: '15px' }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{width: '16px', height: '16px', marginRight: '8px'}}>
                    <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                  Acheter ce service
                </button>
              </div>
            ))
          ) : (
            <div className="modern-card">
              <div className="modern-badge">
                <svg viewBox="0 0 24 24" fill="currentColor" style={{width: '16px', height: '16px', marginRight: '8px'}}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
                Information
              </div>
              <h2 className="modern-subtitle">Services par défaut</h2>
              <p>Aucun service configuré. Contactez l'administrateur.</p>
            </div>
          )}
        </div>

        <div className="modern-card" style={{ marginTop: '30px', textAlign: 'center' }}>
          <h2 className="modern-subtitle">
            <svg viewBox="0 0 24 24" fill="currentColor" style={{width: '20px', height: '20px', marginRight: '8px'}}>
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            Contactez-nous
          </h2>
          <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
            Pour plus d'informations sur nos services, n'hésitez pas à nous contacter.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div className="modern-feature">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{width: '16px', height: '16px', marginRight: '8px'}}>
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span>contact@arbitrage-maroc.ma</span>
            </div>
            <div className="modern-feature">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{width: '16px', height: '16px', marginRight: '8px'}}>
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span>+212 5XX-XXXXXX</span>
            </div>
            <div className="modern-feature">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{width: '16px', height: '16px', marginRight: '8px'}}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>Casablanca, Maroc</span>
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

export default Services;