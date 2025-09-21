import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

const CaseList = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Mes Dossiers d'Arbitrage
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography color="textSecondary">
          Aucun dossier trouvé. Créez votre premier dossier d'arbitrage.
        </Typography>
      </Paper>
    </Box>
  );
};

export default CaseList;