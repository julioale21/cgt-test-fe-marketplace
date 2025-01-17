import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Paper, Typography, Divider } from '@mui/material';
import { Receipt } from '@mui/icons-material';

const OrderDetailsSection = ({ orderId, amount }) => (
  <Paper
    variant="outlined"
    sx={{
      p: 2,
      mb: 3,
      borderRadius: 2,
      bgcolor: 'grey.50'
    }}
  >
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Receipt sx={{ mr: 1 }} color="primary" />
          <Typography variant="subtitle2">Order Details</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Order ID
        </Typography>
        <Typography variant="subtitle2">{orderId}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Amount Paid
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'success.main', fontWeight: 600 }}>
          ${amount.toFixed(2)}
        </Typography>
      </Grid>
    </Grid>
  </Paper>
);

OrderDetailsSection.propTypes = {
  orderId: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired
};

export { OrderDetailsSection };
