import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  MenuItem
} from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const CreateCase = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const conflictTypes = [
    { value: 'commercial', label: 'Commercial' },
    { value: 'civil', label: 'Civil' },
    { value: 'travail', label: 'Travail' },
    { value: 'immobilier', label: 'Immobilier' }
  ];

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('test-8iwign9nb-maryems-projects-c9d6afd2.vercel.app/api/cases', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Dossier créé avec succès');
      setTimeout(() => navigate('/cases'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la création');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Nouveau Dossier d'Arbitrage
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Titre du dossier"
            margin="normal"
            {...register('titre', { required: 'Titre requis' })}
            error={!!errors.titre}
            helperText={errors.titre?.message}
          />
          
          <TextField
            fullWidth
            label="Description détaillée"
            multiline
            rows={4}
            margin="normal"
            {...register('description', { required: 'Description requise' })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          
          <TextField
            fullWidth
            select
            label="Type de conflit"
            margin="normal"
            {...register('type_conflit', { required: 'Type requis' })}
            error={!!errors.type_conflit}
            helperText={errors.type_conflit?.message}
          >
            {conflictTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          
          <TextField
            fullWidth
            label="ID du défendeur"
            type="number"
            margin="normal"
            {...register('defendeur_id', { required: 'ID défendeur requis' })}
            error={!!errors.defendeur_id}
            helperText={errors.defendeur_id?.message}
          />
          
          <TextField
            fullWidth
            label="Montant du litige (MAD)"
            type="number"
            margin="normal"
            {...register('montant_litige', { required: 'Montant requis' })}
            error={!!errors.montant_litige}
            helperText={errors.montant_litige?.message}
          />
          
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
          >
            Créer le Dossier
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateCase;
