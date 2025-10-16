import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { useLanguage } from '../hooks/useLanguage';
import { MdPersonAdd, MdPerson, MdEmail, MdPhone, MdWork, MdSchool, MdBusiness, MdLock } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import '../styles/modern.css';

const Register = () => {
  const navigate = useNavigate();
  const { toasts, success, error: showError, removeToast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    fonction: '',
    niveau_etude: '',
    etablissement: '',
    mot_de_passe: ''
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        password: formData.mot_de_passe
      };
      
      const response = await axios.post('test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/auth/register', dataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      success('🎉 Inscription réussie ! Bienvenue sur la plateforme.');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Erreur lors de l\'inscription';
      setError(errorMsg);
      showError(errorMsg);
    }
  };

  return (
    <div className="modern-page">
      <div className="modern-form">
        <h2 className="modern-title"><MdPersonAdd /> {t('register')}</h2>
        
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder={t('lastName')}
              className="modern-input"
              required
            />
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              placeholder={t('firstName')}
              className="modern-input"
              required
            />
          </div>
          
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
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder={t('phone')}
            className="modern-input"
            required
          />
          
          <input
            type="text"
            name="fonction"
            value={formData.fonction}
            onChange={handleChange}
            placeholder="Fonction"
            className="modern-input"
            required
          />
          
          <select 
            name="niveau_etude" 
            value={formData.niveau_etude} 
            onChange={handleChange} 
            className="modern-input"
            required
          >
            <option value="">Niveau d'étude...</option>
            <option value="bac">Baccalauréat</option>
            <option value="bac+2">Bac+2</option>
            <option value="bac+3">Bac+3</option>
            <option value="bac+5">Bac+5</option>
            <option value="doctorat">Doctorat</option>
          </select>
          
          <input
            type="text"
            name="etablissement"
            value={formData.etablissement}
            onChange={handleChange}
            placeholder="Établissement"
            className="modern-input"
            required
          />
          
          <input
            type="password"
            name="mot_de_passe"
            value={formData.mot_de_passe}
            onChange={handleChange}
            placeholder={t('password')}
            className="modern-input"
            required
            minLength="6"
          />
          
          <button type="submit" className="modern-btn modern-btn-primary">
            <MdPersonAdd /> {t('signUp')}
          </button>
        </form>
        
        <div className="modern-divider">
          <span>ou</span>
        </div>
        
        <button 
          onClick={() => window.location.href = 'test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/auth/google'}
          className="modern-btn modern-btn-google"
        >
          <FcGoogle /> S'inscrire avec Google
        </button>
        
        <div style={{ textAlign: 'center', marginTop: '25px', color: '#666' }}>
          {t('alreadyHaveAccount')} {' '}
          <Link to="/login" className="modern-link">
            {t('login')}
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

export default Register;
