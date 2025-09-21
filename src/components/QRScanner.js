import React, { useState } from 'react';
import axios from 'axios';
import { MdQrCodeScanner, MdCheck, MdError } from 'react-icons/md';

const QRScanner = ({ userId, onSuccess }) => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');

  const handleScan = async () => {
    if (!result) return;
    
    setScanning(true);
    try {
      const response = await axios.post('http://localhost:3000/api/presence/scan', {
        qr_data: result,
        user_id: userId
      });
      
      setMessage('✅ Présence enregistrée avec succès !');
      if (onSuccess) onSuccess();
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.error || 'Erreur lors du scan'));
    } finally {
      setScanning(false);
    }
  };

  return (
    <div style={{
      background: 'white',
      padding: '30px',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      textAlign: 'center',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      <div style={{
        fontSize: '48px',
        color: 'var(--primary-blue)',
        marginBottom: '20px'
      }}>
        <MdQrCodeScanner />
      </div>
      
      <h3 style={{ color: 'var(--primary-blue)', marginBottom: '20px' }}>
        Scanner QR Code de Présence
      </h3>
      
      <textarea
        value={result}
        onChange={(e) => setResult(e.target.value)}
        placeholder="Collez ici les données du QR code ou utilisez un scanner..."
        style={{
          width: '100%',
          height: '100px',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          marginBottom: '20px',
          resize: 'vertical'
        }}
      />
      
      <button
        onClick={handleScan}
        disabled={!result || scanning}
        style={{
          background: scanning ? '#ccc' : 'linear-gradient(135deg, var(--primary-blue), var(--primary-gold))',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          cursor: scanning ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: '600',
          width: '100%',
          marginBottom: '20px'
        }}
      >
        {scanning ? 'Traitement...' : 'Confirmer Présence'}
      </button>
      
      {message && (
        <div style={{
          padding: '12px',
          borderRadius: '8px',
          backgroundColor: message.includes('✅') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          color: message.includes('✅') ? 'var(--accent-green)' : 'var(--error)',
          fontWeight: '500'
        }}>
          {message}
        </div>
      )}
      
      <div style={{
        fontSize: '12px',
        color: 'var(--text-light)',
        marginTop: '15px',
        lineHeight: '1.4'
      }}>
        💡 Astuce: Utilisez l'appareil photo de votre téléphone pour scanner le QR code affiché par le formateur, puis collez les données ici.
      </div>
    </div>
  );
};

export default QRScanner;