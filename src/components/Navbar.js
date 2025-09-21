import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdGavel, MdPerson, MdLogout, MdMenu, MdClose } from 'react-icons/md';
import { useLanguage } from '../hooks/useLanguage';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { language, t, changeLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="container">
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.jpeg" alt="Logo" style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
          Academy pour Arbitrage
        </Link>
        {/* Menu hamburger mobile */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: 'var(--primary-blue)'
          }}
        >
          {mobileMenuOpen ? <MdClose /> : <MdMenu />}
        </button>

        <nav className="nav-links">
          <Link to="/">{t('home')}</Link>
          <Link to="/services">{t('services')}</Link>
          <Link to="/formations">{t('formations')}</Link>
        </nav>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>{t('home')}</Link>
            <Link to="/services" onClick={() => setMobileMenuOpen(false)}>{t('services')}</Link>
            <Link to="/formations" onClick={() => setMobileMenuOpen(false)}>{t('formations')}</Link>
            
            <div className="mobile-menu-actions">
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  marginBottom: '10px',
                  width: '100%'
                }}
              >
                <option value="fr">🇫🇷 Français</option>
                <option value="en">🇺🇸 English</option>
                <option value="ar">🇸🇦 العربية</option>
              </select>
              
              {token ? (
                <>
                  {JSON.parse(localStorage.getItem('user') || '{}').role === 'admin' && (
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>Admin</Link>
                  )}
                  <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="logout-btn">
                    <MdLogout /> {t('logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="login-btn">{t('login')}</Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="signup-btn">{t('register')}</Link>
                </>
              )}
            </div>
          </div>
        )}
        <div className="nav-actions">
          <div className="language-selector" style={{
            position: 'relative',
            marginRight: '15px'
          }}>
            <button
              className="language-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '25px',
                border: '2px solid var(--primary-blue)',
                background: 'rgba(255, 255, 255, 0.9)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--primary-blue)',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--primary-blue)';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                e.target.style.color = 'var(--primary-blue)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: '18px' }}>
                {language === 'fr' ? '🇫🇷' : language === 'en' ? '🇺🇸' : '🇸🇦'}
              </span>
              <span>{language.toUpperCase()}</span>
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px', height: '16px' }}>
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </button>
            
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer'
              }}
            >
              <option value="fr">🇫🇷 Français</option>
              <option value="en">🇺🇸 English</option>
              <option value="ar">🇸🇦 العربية</option>
            </select>
          </div>
          {token ? (
            <>

              {JSON.parse(localStorage.getItem('user') || '{}').role === 'admin' && (
                <Link to="/admin" className="nav-link">Admin</Link>
              )}
              <div className="user-menu">
                <Link to="/profile" className="profile-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{width: '18px', height: '18px'}}>
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </Link>
                <button onClick={handleLogout} className="logout-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{width: '16px', height: '16px', marginRight: '6px'}}>
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                  </svg>
                  {t('logout')}
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="login-btn">{t('login')}</Link>
              <Link to="/register" className="signup-btn">{t('register')}</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;