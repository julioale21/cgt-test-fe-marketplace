import React from 'react';

import { Box, Typography } from '@mui/material';

import { CheckCircle } from '@mui/icons-material';

const SuccessHeader = () => (
  <>
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100px',
        bgcolor: 'success.light',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          bgcolor: 'common.white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CheckCircle color="success" sx={{ fontSize: '40px' }} />
      </Box>
    </Box>
    <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 600 }}>
      Payment Successful!
    </Typography>
    <Typography variant="body1" align="center" color="text.secondary" paragraph sx={{ mb: 4 }}>
      Thank you for your order! A confirmation email will be sent shortly.
    </Typography>
  </>
);

export { SuccessHeader };
