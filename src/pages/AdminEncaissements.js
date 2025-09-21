import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavigation from '../components/AdminNavigation';
import { MdPayment, MdDownload, MdVisibility, MdPrint, MdFileDownload, MdDateRange } from 'react-icons/md';

const AdminEncaissements = () => {
  const navigate = useNavigate();
  const [encaissements, setEncaissements] = useState([]);
  const [filteredEncaissements, setFilteredEncaissements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!token || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchEncaissements();
  }, [token, user.role, navigate]);

  const fetchEncaissements = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/encaissements', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEncaissements(response.data);
      setFilteredEncaissements(response.data);
    } catch (error) {
      console.error('Erreur encaissements:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadRecu = (filename) => {
    window.open(`http://localhost:3000/api/admin/recu/${filename}`, '_blank');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filterByDate = () => {
    let filtered = encaissements;
    if (dateDebut) {
      filtered = filtered.filter(e => new Date(e.date_creation) >= new Date(dateDebut));
    }
    if (dateFin) {
      filtered = filtered.filter(e => new Date(e.date_creation) <= new Date(dateFin + 'T23:59:59'));
    }
    setFilteredEncaissements(filtered);
  };

  const resetFilter = () => {
    setDateDebut('');
    setDateFin('');
    setFilteredEncaissements(encaissements);
  };

  const getTotalAmount = () => {
    return filteredEncaissements.reduce((sum, e) => sum + parseFloat(e.montant), 0).toFixed(2);
  };

  const printReport = () => {
    const printContent = `
      <html>
        <head>
          <title>Rapport Encaissements</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #1e3a8a; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f8f9fa; }
            .total { font-weight: bold; background-color: #e8f5e8; }
          </style>
        </head>
        <body>
          <h1>Rapport des Encaissements</h1>
          <p>Période: ${dateDebut || 'Début'} - ${dateFin || 'Fin'}</p>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Client</th>
                <th>Transaction</th>
                <th>Méthode</th>
                <th>Montant</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEncaissements.map(e => `
                <tr>
                  <td>${formatDate(e.date_creation)}</td>
                  <td>${e.prenom} ${e.nom}</td>
                  <td>${e.transaction_id}</td>
                  <td>${e.methode_paiement}</td>
                  <td>${e.montant} DH</td>
                </tr>
              `).join('')}
              <tr class="total">
                <td colspan="4">TOTAL</td>
                <td>${getTotalAmount()} DH</td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Client', 'Email', 'Transaction', 'Méthode', 'Montant'];
    const csvContent = [
      headers.join(','),
      ...filteredEncaissements.map(e => [
        formatDate(e.date_creation),
        `"${e.prenom} ${e.nom}"`,
        e.email,
        e.transaction_id,
        e.methode_paiement,
        e.montant
      ].join(',')),
      `,,,,TOTAL,${getTotalAmount()}`
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `encaissements_${dateDebut || 'debut'}_${dateFin || 'fin'}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getMethodeColor = (methode) => {
    switch (methode) {
      case 'carte': return 'var(--primary-blue)';
      case 'paypal': return 'var(--primary-gold)';
      case 'virement': return 'var(--accent-green)';
      case 'versement': return 'var(--text-light)';
      default: return 'var(--text-dark)';
    }
  };

  if (!token || user.role !== 'admin') {
    return <div>Accès refusé</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--light-gray)' }}>
      <AdminNavigation />
      
      <div className="admin-header">
        <h1>Rapport des Encaissements</h1>
        <p>Liste de tous les paiements reçus</p>
      </div>

      {/* Filtres et Actions */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MdDateRange style={{ color: 'var(--primary-blue)' }} />
            <label>Du:</label>
            <input
              type="date"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label>Au:</label>
            <input
              type="date"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <button
            onClick={filterByDate}
            style={{
              background: 'var(--primary-blue)',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Filtrer
          </button>
          <button
            onClick={resetFilter}
            style={{
              background: 'var(--text-light)',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
            <button
              onClick={printReport}
              style={{
                background: 'var(--accent-green)',
                color: 'white',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <MdPrint /> Imprimer
            </button>
            <button
              onClick={exportToCSV}
              style={{
                background: 'var(--primary-gold)',
                color: 'white',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <MdFileDownload /> Export CSV
            </button>
          </div>
        </div>
        <div style={{ marginTop: '15px', fontSize: '18px', fontWeight: '600', color: 'var(--primary-blue)' }}>
          Total: {getTotalAmount()} DH ({filteredEncaissements.length} paiements)
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Chargement...</div>
      ) : (
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
            <MdPayment style={{ fontSize: '24px' }} />
            <h2 style={{ margin: 0 }}>Encaissements ({filteredEncaissements.length})</h2>
          </div>

          <div style={{ padding: '20px' }}>
            {filteredEncaissements.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>
                Aucun encaissement trouvé
              </p>
            ) : (
              <div style={{ display: 'grid', gap: '16px' }}>
                {filteredEncaissements.map((encaissement) => (
                  <div key={encaissement.id} style={{
                    border: '1px solid #e9ecef',
                    borderRadius: '12px',
                    padding: '20px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'translateY(0)';
                  }}>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                      gap: '16px',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontWeight: '600', color: 'var(--text-dark)', marginBottom: '4px' }}>
                          {encaissement.prenom} {encaissement.nom}
                        </div>
                        <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                          {encaissement.email}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontWeight: '600', color: 'var(--text-dark)', marginBottom: '4px' }}>
                          Transaction: {encaissement.transaction_id}
                        </div>
                        <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                          {encaissement.type_produit} #{encaissement.produit_id}
                        </div>
                      </div>

                      <div>
                        <div style={{ 
                          fontWeight: '600', 
                          color: getMethodeColor(encaissement.methode_paiement),
                          marginBottom: '4px',
                          textTransform: 'capitalize'
                        }}>
                          {encaissement.methode_paiement}
                        </div>
                        <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                          {formatDate(encaissement.date_creation)}
                        </div>
                      </div>

                      <div>
                        <div style={{ 
                          fontSize: '18px', 
                          fontWeight: '700', 
                          color: 'var(--accent-green)',
                          marginBottom: '4px'
                        }}>
                          {encaissement.montant} DH
                        </div>
                        <div style={{ 
                          fontSize: '12px', 
                          padding: '2px 8px',
                          borderRadius: '12px',
                          backgroundColor: encaissement.statut === 'reussi' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          color: encaissement.statut === 'reussi' ? 'var(--accent-green)' : 'var(--error)',
                          textTransform: 'uppercase',
                          fontWeight: '600'
                        }}>
                          {encaissement.statut}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        {encaissement.recu_path && (
                          <button
                            onClick={() => downloadRecu(encaissement.recu_path.split('/').pop())}
                            style={{
                              background: 'var(--primary-blue)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '8px 12px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '12px'
                            }}
                          >
                            <MdDownload /> Reçu
                          </button>
                        )}
                        <button
                          style={{
                            background: 'var(--primary-gold)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '12px'
                          }}
                        >
                          <MdVisibility /> Détails
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEncaissements;