import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { OutlinedButton } from '../buttons/OutlinedButton';

const EmptyCart = ({ onContinueShopping }) => (
  <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
    <CardContent sx={{ textAlign: 'center', py: 4 }}>
      <ShoppingCartIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
      <Typography color="text.secondary" gutterBottom>
        Your cart is empty
      </Typography>
      <OutlinedButton startIcon={<ArrowBackIcon />} onClick={onContinueShopping} sx={{ mt: 2 }}>
        Start Shopping
      </OutlinedButton>
    </CardContent>
  </Card>
);

EmptyCart.propTypes = {
  onContinueShopping: PropTypes.func.isRequired
};

export { EmptyCart };
