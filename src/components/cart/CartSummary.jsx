import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, Divider, Stack } from '@mui/material';
import { PaymentMethodIcon } from './PaymentMethodIcon';

const formatCurrency = (amount) => {
  const value = amount < 0 ? 0 : amount;

  return `$${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

const CartSummary = ({ subtotal, shipping, taxes, finalTotal, onCheckout, onContinueShopping }) => (
  <Box
    sx={{
      bgcolor: 'grey.50',
      borderRadius: 2,
      p: 3,
      position: 'sticky',
      top: 24
    }}
  >
    <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
      Order Summary
    </Typography>

    <Stack spacing={2}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography color="text.secondary">Subtotal</Typography>
        <Typography>{formatCurrency(subtotal)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography color="text.secondary">Shipping</Typography>
        <Typography color="success.main">
          {shipping > 0 ? formatCurrency(shipping) : 'Free'}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography color="text.secondary">Estimated tax</Typography>
        <Typography>{formatCurrency(taxes)}</Typography>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">{formatCurrency(finalTotal)}</Typography>
      </Box>
    </Stack>

    <Stack spacing={2} sx={{ mt: 4 }}>
      <Button
        variant="contained"
        size="large"
        onClick={onCheckout}
        sx={{
          py: 1.5,
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark'
          }
        }}
      >
        Continue to Checkout
      </Button>
      <Button variant="outlined" size="large" onClick={onContinueShopping} sx={{ py: 1.5 }}>
        Continue Shopping
      </Button>
    </Stack>

    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Secure Checkout
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          py: 2,
          px: 1,
          bgcolor: 'grey.50',
          borderRadius: 1,
          justifyContent: 'center'
        }}
      >
        <PaymentMethodIcon
          src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png"
          alt="Visa"
        />
        <PaymentMethodIcon
          src="https://cdn.worldvectorlogo.com/logos/mastercard-7.svg"
          alt="Mastercard"
        />
        <PaymentMethodIcon
          src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg"
          alt="PayPal"
        />
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
        <Box
          component="svg"
          viewBox="0 0 24 24"
          sx={{
            width: 20,
            height: 20,
            color: 'text.secondary'
          }}
        >
          <path fill="currentColor" d="M20 8H4M20 16H4" />
        </Box>
        <Typography variant="body2" color="text.secondary">
          Free shipping on all orders
        </Typography>
      </Stack>
    </Box>
  </Box>
);

CartSummary.propTypes = {
  subtotal: PropTypes.number.isRequired,
  shipping: PropTypes.number.isRequired,
  taxes: PropTypes.number.isRequired,
  finalTotal: PropTypes.number.isRequired,
  onCheckout: PropTypes.func,
  onContinueShopping: PropTypes.func
};

export { CartSummary };
