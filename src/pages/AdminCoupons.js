import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavigation from '../components/AdminNavigation';
import { MdLocalOffer, MdAdd, MdPercent, MdAttachMoney } from 'react-icons/md';

const AdminCoupons = () => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    nom: '',
    type_reduction: 'pourcentage',
    valeur_reduction: '',
    date_debut: '',
    date_fin: '',
    limite_utilisation: ''
  });

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!token || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchCoupons();
  }, [token, user.role, navigate]);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/coupons/admin/list');
      setCoupons(response.data);
    } catch (error) {
      console.error('Erreur coupons:', error);
    }
  };

  const createCoupon = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/coupons/create', formData);
      setShowForm(false);
      setFormData({
        code: '',
        nom: '',
        type_reduction: 'pourcentage',
        valeur_reduction: '',
        date_debut: '',
        date_fin: '',
        limite_utilisation: ''
      });
      fetchCoupons();
    } catch (error) {
      console.error('Erreur création coupon:', error);
    }
  };

  const generateCode = () => {
    const code = 'COUPON' + Math.random().toString(36).substr(2, 6).toUpperCase();
    setFormData({...formData, code});
  };

  if (!token || user.role !== 'admin') {
    return <div>Accès refusé</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--light-gray)' }}>
      <AdminNavigation />
      
      <div className="admin-header">
        <h1>Gestion des Coupons</h1>
        <p>Créer et gérer les codes de réduction</p>
      </div>

      <div className="admin-content">
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <button
            onClick={() => setShowForm(!showForm)}
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
            <MdAdd /> Créer un coupon
          </button>
        </div>

        {showForm && (
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            marginBottom: '30px'
          }}>
            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '20px' }}>
              <MdLocalOffer /> Nouveau Coupon
            </h3>
            <form onSubmit={createCoupon}>
              <div style={{ display: 'grid', gap: '15px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Code du coupon"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                    required
                  />
                  <button
                    type="button"
                    onClick={generateCode}
                    style={{
                      background: 'var(--text-light)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Générer
                  </button>
                </div>
                
                <input
                  type="text"
                  placeholder="Nom du coupon"
                  value={formData.nom}
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                  required
                />
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <select
                    value={formData.type_reduction}
                    onChange={(e) => setFormData({...formData, type_reduction: e.target.value})}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                  >
                    <option value="pourcentage">Pourcentage (%)</option>
                    <option value="montant">Montant fixe (DH)</option>
                  </select>
                  
                  <input
                    type="number"
                    placeholder={formData.type_reduction === 'pourcentage' ? 'Ex: 20' : 'Ex: 100'}
                    value={formData.valeur_reduction}
                    onChange={(e) => setFormData({...formData, valeur_reduction: e.target.value})}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                    required
                  />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <input
                    type="date"
                    value={formData.date_debut}
                    onChange={(e) => setFormData({...formData, date_debut: e.target.value})}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                    required
                  />
                  <input
                    type="date"
                    value={formData.date_fin}
                    onChange={(e) => setFormData({...formData, date_fin: e.target.value})}
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                    required
                  />
                </div>
                
                <input
                  type="number"
                  placeholder="Limite d'utilisation (optionnel)"
                  value={formData.limite_utilisation}
                  onChange={(e) => setFormData({...formData, limite_utilisation: e.target.value})}
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                />
                
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
                  Créer le coupon
                </button>
              </div>
            </form>
          </div>
        )}

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
            <MdLocalOffer style={{ fontSize: '24px' }} />
            <h2 style={{ margin: 0 }}>Coupons ({coupons.length})</h2>
          </div>

          <div style={{ padding: '20px' }}>
            {coupons.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>
                Aucun coupon créé
              </p>
            ) : (
              <div style={{ display: 'grid', gap: '16px' }}>
                {coupons.map((coupon) => (
                  <div key={coupon.id} style={{
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
                        <div style={{ fontWeight: '700', fontSize: '18px', color: 'var(--primary-blue)', marginBottom: '4px' }}>
                          {coupon.code}
                        </div>
                        <div style={{ fontSize: '14px', color: 'var(--text-dark)' }}>
                          {coupon.nom}
                        </div>
                      </div>

                      <div>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '4px',
                          fontSize: '16px',
                          fontWeight: '600',
                          color: 'var(--accent-green)',
                          marginBottom: '4px'
                        }}>
                          {coupon.type_reduction === 'pourcentage' ? <MdPercent /> : <MdAttachMoney />}
                          {coupon.valeur_reduction}{coupon.type_reduction === 'pourcentage' ? '%' : ' DH'}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                          Réduction {coupon.type_reduction}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '4px' }}>
                          Du {new Date(coupon.date_debut).toLocaleDateString()}
                        </div>
                        <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                          Au {new Date(coupon.date_fin).toLocaleDateString()}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-dark)', marginBottom: '4px' }}>
                          {coupon.total_utilisations || 0} utilisations
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                          {coupon.limite_utilisation ? `Limite: ${coupon.limite_utilisation}` : 'Illimité'}
                        </div>
                      </div>

                      <div>
                        <div style={{
                          fontSize: '12px',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          backgroundColor: coupon.statut === 'actif' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          color: coupon.statut === 'actif' ? 'var(--accent-green)' : 'var(--error)',
                          textTransform: 'uppercase',
                          fontWeight: '600',
                          width: 'fit-content'
                        }}>
                          {coupon.statut}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCoupons;