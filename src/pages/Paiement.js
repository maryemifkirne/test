import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { MdPayment, MdCreditCard, MdAccountBalanceWallet, MdAccountBalance, MdAttachMoney, MdCheckCircle, MdCancel } from 'react-icons/md';
import { FaPaypal } from 'react-icons/fa';

const Paiement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, produit } = location.state || {};
  const { toasts, success, error, removeToast } = useToast();
  
  const [methodePaiement, setMethodePaiement] = useState('carte');
  const [loading, setLoading] = useState(false);
  const [codeCoupon, setCodeCoupon] = useState('');
  const [couponApplique, setCouponApplique] = useState(null);
  const [prixFinal, setPrixFinal] = useState(produit?.prix || produit?.prix_base || 0);
  const [formData, setFormData] = useState({
    // Carte
    numerocarte: '',
    nomTitulaire: '',
    dateExpiration: '',
    cvv: '',
    // PayPal
    emailPaypal: '',
    motPassePaypal: '',
    // Virement
    recuFile: null
  });

  if (!produit) {
    return <div>Erreur: Aucun produit sélectionné</div>;
  }

  const verifierCoupon = async () => {
    if (!codeCoupon) return;
    
    try {
      const response = await axios.post('http://localhost:3000/api/coupons/verify', {
        code: codeCoupon,
        montant_commande: produit?.prix || produit?.prix_base
      });
      
      setCouponApplique(response.data);
      setPrixFinal(response.data.nouveau_total);
      success(`Coupon appliqué ! Réduction de ${response.data.montant_reduction} DH`);
    } catch (err) {
      error(err.response?.data?.error || 'Coupon invalide');
      setCouponApplique(null);
      setPrixFinal(produit?.prix || produit?.prix_base);
    }
  };

  const handlePaiement = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      
      const formDataToSend = new FormData();
      formDataToSend.append('user_id', user?.id);
      formDataToSend.append('type_produit', type);
      formDataToSend.append('produit_id', produit?.id);
      formDataToSend.append('prix', prixFinal);
      formDataToSend.append('methode_paiement', methodePaiement);
      formDataToSend.append('details_paiement', JSON.stringify(formData));
      
      if (couponApplique) {
        formDataToSend.append('coupon_id', couponApplique.coupon.id);
        formDataToSend.append('montant_reduction', couponApplique.montant_reduction);
      }
      
      if (formData.recuFile) {
        formDataToSend.append('recu', formData.recuFile);
      }

      const response = await axios.post('http://localhost:3000/api/purchase/paiement', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Utiliser le coupon si appliqué
      if (couponApplique) {
        await axios.post('http://localhost:3000/api/coupons/use', {
          coupon_id: couponApplique.coupon.id,
          user_id: user?.id,
          commande_id: response.data.commande.id,
          montant_reduction: couponApplique.montant_reduction
        });
      }

      success('🎉 Paiement réussi ! Redirection vers votre espace personnel...');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      console.error('Erreur complète:', error);
      error('Erreur lors du paiement: ' + (error.response?.data?.error || error.message));
    }
    setLoading(false);
  };

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="paiement-container" style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary-blue) 0%, var(--dark-navy) 100%)',
          color: 'white',
          padding: '30px',
          textAlign: 'center'
        }}>
          <MdPayment style={{ fontSize: '48px', marginBottom: '10px' }} />
          <h1 style={{ margin: '0', fontSize: '28px', fontWeight: '600' }}>Finaliser votre paiement</h1>
          <p style={{ margin: '10px 0 0', opacity: '0.9' }}>Sécurisé et rapide</p>
        </div>

        <div style={{ padding: '40px' }}>
          {/* Résumé de commande */}
          <div className="order-summary" style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '25px',
            marginBottom: '30px'
          }}>
            <h2 style={{ color: '#495057', marginBottom: '15px', fontSize: '20px' }}>Résumé de votre commande</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#212529', margin: '0 0 8px', fontSize: '18px' }}>{produit.titre || produit.nom}</h3>
                <p style={{ color: '#6c757d', margin: '0', fontSize: '14px' }}>{produit.description}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: couponApplique ? 'var(--accent-green)' : 'var(--primary-gold)',
                  marginBottom: '5px'
                }}>
                  {prixFinal} DH
                  {couponApplique && (
                    <div style={{ fontSize: '14px', textDecoration: 'line-through', color: '#6c757d' }}>
                      {produit.prix || produit.prix_base} DH
                    </div>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: '#6c757d' }}>TTC</div>
              </div>
            </div>
          </div>

          {/* Code coupon */}
          <div style={{ 
            backgroundColor: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '25px',
            marginBottom: '30px'
          }}>
            <h3 style={{ color: '#495057', marginBottom: '15px', fontSize: '18px' }}>Code de réduction</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Entrez votre code coupon"
                value={codeCoupon}
                onChange={(e) => setCodeCoupon(e.target.value.toUpperCase())}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '16px'
                }}
              />
              <button
                type="button"
                onClick={verifierCoupon}
                style={{
                  background: 'var(--primary-blue)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Appliquer
              </button>
            </div>
            {couponApplique && (
              <div style={{ 
                marginTop: '15px',
                padding: '10px',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '6px',
                color: 'var(--accent-green)',
                fontSize: '14px'
              }}>
                ✅ Coupon "{couponApplique.coupon.code}" appliqué ! 
                Réduction de {couponApplique.montant_reduction} DH
              </div>
            )}
          </div>

          {/* Méthodes de paiement */}
          <div className="payment-methods">
            <h3 style={{ color: '#495057', marginBottom: '20px', fontSize: '18px' }}>Choisissez votre méthode de paiement</h3>
            
            <div style={{ display: 'grid', gap: '15px' }}>
              {[
                { value: 'carte', icon: <MdCreditCard />, label: 'Carte bancaire', desc: 'Visa, Mastercard, American Express' },
                { value: 'paypal', icon: <FaPaypal />, label: 'PayPal', desc: 'Paiement sécurisé via PayPal' },
                { value: 'virement', icon: <MdAccountBalance />, label: 'Virement bancaire', desc: 'Virement SEPA' },
                { value: 'versement', icon: <MdAttachMoney />, label: 'Versement en espèces', desc: 'Paiement en agence' }
              ].map((method) => (
                <label key={method.value} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '20px',
                  border: methodePaiement === method.value ? '2px solid var(--primary-blue)' : '2px solid #e9ecef',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: methodePaiement === method.value ? 'rgba(30, 58, 138, 0.05)' : '#fff'
                }}>
                  <input 
                    type="radio" 
                    value={method.value}
                    checked={methodePaiement === method.value}
                    onChange={(e) => setMethodePaiement(e.target.value)}
                    style={{ marginRight: '15px', transform: 'scale(1.2)' }}
                  />
                  <div style={{ fontSize: '24px', marginRight: '15px', color: 'var(--primary-blue)' }}>
                    {method.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#212529', marginBottom: '4px' }}>
                      {method.label}
                    </div>
                    <div style={{ fontSize: '14px', color: '#6c757d' }}>
                      {method.desc}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Formulaires spécifiques */}
          {methodePaiement === 'carte' && (
            <div style={{ marginTop: '30px', padding: '25px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4 style={{ color: 'var(--primary-blue)', marginBottom: '20px' }}>Informations de la carte</h4>
              <div style={{ display: 'grid', gap: '15px' }}>
                <input
                  type="text"
                  placeholder="Numéro de carte (16 chiffres)"
                  value={formData.numeroCart}
                  onChange={(e) => setFormData({...formData, numeroCart: e.target.value.replace(/\D/g, '').slice(0, 16)})}
                  style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
                  required
                />
                <input
                  type="text"
                  placeholder="Nom du titulaire"
                  value={formData.nomTitulaire}
                  onChange={(e) => setFormData({...formData, nomTitulaire: e.target.value})}
                  style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
                  required
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    value={formData.dateExpiration}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2, 4);
                      setFormData({...formData, dateExpiration: value});
                    }}
                    style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
                    maxLength="5"
                    required
                  />
                  <input
                    type="text"
                    placeholder="CVV (3 chiffres)"
                    value={formData.cvv}
                    onChange={(e) => setFormData({...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 3)})}
                    style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
                    maxLength="3"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {methodePaiement === 'paypal' && (
            <div style={{ marginTop: '30px', padding: '25px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4 style={{ color: 'var(--primary-blue)', marginBottom: '20px' }}>Connexion PayPal</h4>
              <div style={{ display: 'grid', gap: '15px' }}>
                <input
                  type="email"
                  placeholder="Email PayPal"
                  value={formData.emailPaypal}
                  onChange={(e) => setFormData({...formData, emailPaypal: e.target.value})}
                  style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
                  required
                />
                <input
                  type="password"
                  placeholder="Mot de passe PayPal"
                  value={formData.motPassePaypal}
                  onChange={(e) => setFormData({...formData, motPassePaypal: e.target.value})}
                  style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
                  required
                />
              </div>
            </div>
          )}

          {methodePaiement === 'virement' && (
            <div style={{ marginTop: '30px', padding: '25px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4 style={{ color: 'var(--primary-blue)', marginBottom: '20px' }}>Coordonnées bancaires</h4>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '6px', marginBottom: '20px' }}>
                <p><strong>Bénéficiaire :</strong> Plateforme d'Arbitrage SARL</p>
                <p><strong>IBAN :</strong> MA64 011 780 0000001234567890</p>
                <p><strong>BIC/SWIFT :</strong> BMCEMAMC</p>
                <p><strong>Banque :</strong> BMCE Bank</p>
                <p><strong>Référence :</strong> {type}-{produit?.id}-{Date.now()}</p>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>Télécharger le reçu de virement :</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setFormData({...formData, recuFile: e.target.files[0]})}
                  style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ddd', width: '100%' }}
                  required
                />
              </div>
            </div>
          )}

          {methodePaiement === 'versement' && (
            <div style={{ marginTop: '30px', padding: '25px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4 style={{ color: 'var(--primary-blue)', marginBottom: '20px' }}>Versement en espèces</h4>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '6px' }}>
                <p><strong>Adresse :</strong> 207-209 DB Mouqawama immeuble le casablanca 3ème étage</p>
                <p><strong>Horaires :</strong> Lundi - Vendredi : 9h00 - 17h00</p>
                <p><strong>Téléphone :</strong> +212 520146463</p>
                <p style={{ color: 'var(--primary-gold)', fontWeight: '600' }}>Veuillez vous présenter avec une pièce d'identité</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="payment-actions" style={{ 
            marginTop: '40px',
            display: 'flex',
            gap: '15px',
            justifyContent: 'center'
          }}>
            <button 
              onClick={handlePaiement}
              disabled={loading}
              style={{
                background: loading ? '#ccc' : 'linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-gold) 100%)',
                color: 'white',
                padding: '15px 40px',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(30, 58, 138, 0.4)'
              }}
            >
              {loading ? 'Traitement...' : <><MdCheckCircle /> Confirmer le paiement</>}
            </button>
            
            <button 
              onClick={() => navigate(-1)}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                padding: '15px 40px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
            >
              <MdCancel /> Annuler
            </button>
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
  );
};

export default Paiement;