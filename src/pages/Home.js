import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdBusiness, MdGavel, MdHome, MdPeople, MdSchool, MdAccessTime, MdStar, MdPerson, MdBolt, MdSecurity, MdWork } from 'react-icons/md';
import { useLanguage } from '../hooks/useLanguage';

const Home = () => {
  const [formations, setFormations] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const { t } = useLanguage();

  useEffect(() => {
    fetchFormations();
    fetchTestimonials();
  }, []);

  const fetchFormations = async () => {
    try {
      const response = await axios.get('test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/public/formations');
      setFormations(response.data.slice(0, 3));
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/public/testimonials');
      setTestimonials(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="container">
          <h1>{t('heroTitle')}</h1>
          <p>{t('heroSubtitle')}</p>
          <Link to="/register" className="hero-btn">
            {t('startNow')}
          </Link>
        </div>
      </div>

      <div className="container">
        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2 1l-3 4v2h2l2.54-3.4L16.5 18H20zm-8.5 0v-7.5L9.87 8.66C9.53 8.26 9.03 8 8.5 8s-1.03.26-1.37.66L5.5 10.5V18h2v-6l1.5-1.5L10.5 18h1z"/>
                </svg>
              </div>
              <h3 className="stat-number">2,500+</h3>
              <p className="stat-label">{t('satisfiedClients')}</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h3 className="stat-number">150+</h3>
              <p className="stat-label">{t('trainingsProvided')}</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <h3 className="stat-number">98%</h3>
              <p className="stat-label">{t('resolutionRate')}</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                  <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
              </div>
              <h3 className="stat-number">15</h3>
              <p className="stat-label">{t('averageDays')}</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="stat-number">50+</h3>
              <p className="stat-label">{t('expertArbitrators')}</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="stat-number">8</h3>
              <p className="stat-label">{t('yearsExperience')}</p>
            </div>
          </div>
        </div>

        <div className="services-section">
          <h2>{t('ourExpertise')}</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                </svg>
              </div>
              <h3>{t('commercialArbitration')}</h3>
              <p>{t('commercialArbitrationDesc')}</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2zm0 4.24l-2.18 4.41-4.85.71 3.52 3.43-.83 4.85L12 17.77l4.34 2.28-.83-4.85 3.52-3.43-4.85-.71L12 6.24z"/>
                </svg>
              </div>
              <h3>{t('civilArbitration')}</h3>
              <p>{t('civilArbitrationDesc')}</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
              </div>
              <h3>{t('realEstateArbitration')}</h3>
              <p>{t('realEstateArbitrationDesc')}</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                </svg>
              </div>
              <h3>{t('laborArbitration')}</h3>
              <p>{t('laborArbitrationDesc')}</p>
            </div>
          </div>
        </div>

        <div className="formations-section">
          <h2>{t('ourTrainings')}</h2>
          <div className="formations-grid">
            {formations.map(formation => (
              <div key={formation.id} className="formation-card">
                <div className="formation-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                  </svg>
                </div>
                <h3>{formation.titre}</h3>
                <p>{formation.description}</p>
                <div className="formation-details">
                  <span className="duration"><MdAccessTime /> {formation.duree}</span>
                  <span className="price">{formation.prix} DH</span>
                </div>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/formations" className="view-all-btn">{t('viewAllTrainings')}</Link>
          </div>
        </div>

        <div className="testimonials-section">
          <h2>{t('whatClientsSay')}</h2>
          <div className="testimonials-grid">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="client-avatar"><MdPerson /></div>
                  <div className="client-info">
                    <h4>{testimonial.nom} {testimonial.prenom}</h4>
                    <div className="rating">
                      {[...Array(testimonial.note)].map((_, i) => (
                        <span key={i} className="star"><MdStar /></span>
                      ))}
                    </div>
                  </div>
                </div>
                <p>"{testimonial.message}"</p>
              </div>
            ))}
          </div>
        </div>

        <div className="why-section">
          <h2>{t('whyChooseUs')}</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
                </svg>
              </div>
              <h4>{t('speed')}</h4>
              <p>{t('speedDesc')}</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11C15.4,11 16,11.4 16,12V16C16,16.6 15.6,17 15,17H9C8.4,17 8,16.6 8,16V12C8,11.4 8.4,11 9,11V10C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,9.2 10.2,10V11H13.8V10C13.8,9.2 12.8,8.2 12,8.2Z"/>
                </svg>
              </div>
              <h4>{t('security')}</h4>
              <p>{t('securityDesc')}</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                </svg>
              </div>
              <h4>{t('expertise')}</h4>
              <p>{t('expertiseDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Plateforme d'Arbitrage</h3>
              <p>Votre partenaire de confiance pour la résolution de conflits. Nous offrons des services d'arbitrage professionnels, rapides et équitables.</p>
              <div className="social-links">
                <a href="https://linkedin.com" className="social-link" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://facebook.com" className="social-link" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" className="social-link" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h3>Contact</h3>
              <div className="contact-info">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>123 Avenue Mohammed V, Casablanca, Maroc</span>
              </div>
              <div className="contact-info">
                <svg viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>+212 5 22 XX XX XX</span>
              </div>
              <div className="contact-info">
                <svg viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>contact@arbitrage-platform.ma</span>
              </div>
              <div className="contact-info">
                <svg viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                  <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                <span>Lun - Ven: 9h00 - 18h00</span>
              </div>
            </div>

            <div className="footer-section">
              <h3>Services</h3>
              <ul>
                <li>Arbitrage Commercial</li>
                <li>Arbitrage Civil</li>
                <li>Arbitrage Immobilier</li>
                <li>Arbitrage du Travail</li>
                <li>Médiation</li>
                <li>Formations</li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Liens Utiles</h3>
              <ul>
                <li>À propos</li>
                <li>Nos arbitres</li>
                <li>Tarifs</li>
                <li>FAQ</li>
                <li>Conditions d'utilisation</li>
                <li>Politique de confidentialité</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Plateforme d'Arbitrage. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
