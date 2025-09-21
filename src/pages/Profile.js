import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [formData, setFormData] = useState({
    formations: '',
    services: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:3000/api/user/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Profil mis à jour avec succès');
    } catch (err) {
      setMessage('Erreur lors de la mise à jour');
    }
  };

  return (
    <div className="form-container">
      <h2>Mon Profil - Formations & Services</h2>
      
      {message && <div style={{color: 'green', marginBottom: '10px'}}>{message}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Formations:</label>
          <textarea
            name="formations"
            value={formData.formations}
            onChange={handleChange}
            rows="4"
            placeholder="Décrivez vos formations..."
          />
        </div>
        
        <div className="form-group">
          <label>Services proposés:</label>
          <textarea
            name="services"
            value={formData.services}
            onChange={handleChange}
            rows="4"
            placeholder="Décrivez les services que vous proposez..."
          />
        </div>
        
        <button type="submit" className="btn">Mettre à jour</button>
      </form>
    </div>
  );
};

export default Profile;