import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toasts, success, error, removeToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post('http://localhost:3000/api/auth/forgot-password', { email });
      success('📧 Instructions envoyées par email !');
      setEmail('');
    } catch (err) {
      error(err.response?.data?.error || 'Erreur lors de l\'envoi');
    }
    
    setLoading(false);
  };

  return (
    <div className="form-container" style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>🔐 Mot de passe oublié</h2>
      
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Entrez votre email pour recevoir les instructions de réinitialisation
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="votre@email.com"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '16px'
            }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: '#2563EB',
            color: 'white',
            padding: '12px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '20px'
          }}
        >
          {loading ? '⏳ Envoi...' : '📧 Envoyer les instructions'}
        </button>
      </form>
      
      <div style={{ textAlign: 'center' }}>
        <Link to="/login" style={{ color: '#2563EB', textDecoration: 'none' }}>
          ← Retour à la connexion
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
  );
};

export default ForgotPassword;