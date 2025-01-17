import React from 'react';

import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import { LocalShipping } from '@mui/icons-material';

import PropTypes from 'prop-types';

const ShippingSection = ({ email, address, city }) => (
  <Paper
    variant="outlined"
    sx={{
      p: 2,
      borderRadius: 2,
      bgcolor: 'grey.50'
    }}
  >
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocalShipping sx={{ mr: 1 }} color="primary" />
          <Typography variant="subtitle2">Shipping Information</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Email
        </Typography>
        <Typography variant="subtitle2">{email}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Shipping Address
        </Typography>
        <Typography variant="subtitle2">{address}</Typography>
        <Typography variant="subtitle2">{city}</Typography>
      </Grid>
    </Grid>
  </Paper>
);

ShippingSection.propTypes = {
  email: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired
};

export { ShippingSection };
