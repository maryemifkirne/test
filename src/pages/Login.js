import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { useLanguage } from '../hooks/useLanguage';
import { MdLock, MdEmail, MdLogin, MdLockReset } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import '../styles/modern.css';

const Login = () => {
  const navigate = useNavigate();
  const { toasts, success, error: showError, removeToast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      success('🎉 Connexion réussie ! Bienvenue.');
      // Redirection selon le rôle
      setTimeout(() => {
        if (response.data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 1500);
    } catch (err) {
      console.log('Erreur complète:', err);
      const errorMsg = err.response?.data?.error || err.message || 'Erreur de connexion';
      setError(errorMsg);
      showError(errorMsg);
    }
  };

  return (
    <div className="modern-page">
      <div className="modern-form">
        <h2 className="modern-title"><MdLock /> {t('login')}</h2>
        
        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('email')}
            className="modern-input"
            required
          />
          
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={t('password')}
            className="modern-input"
            required
          />
          
          <button type="submit" className="modern-btn modern-btn-primary">
            <MdLogin /> {t('signIn')}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <Link to="/forgot-password" className="modern-link">
            <MdLockReset /> {t('forgotPassword')}
          </Link>
        </div>
        
        <div className="modern-divider">
          <span>ou</span>
        </div>
        
        <button 
          onClick={() => window.location.href = 'test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/auth/google'}
          className="modern-btn modern-btn-google"
        >
          <FcGoogle /> Continuer avec Google
        </button>
        
        <div style={{ textAlign: 'center', marginTop: '25px', color: '#666' }}>
          {t('dontHaveAccount')} {' '}
          <Link to="/register" className="modern-link">
            {t('register')}
          </Link>
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

export default Login;
