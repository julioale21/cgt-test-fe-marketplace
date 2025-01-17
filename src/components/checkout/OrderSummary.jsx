import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Divider, Paper, Typography } from '@mui/material';
import { LocalShipping } from '@mui/icons-material';

const OrderSummary = ({ items, subtotal, shipping, taxes, finalTotal }) => {
  return (
    <Box sx={{ flex: 1 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          backgroundColor: 'grey.50',
          borderRadius: 2
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Order Summary
        </Typography>

        <Box sx={{ mb: 3 }}>
          {items.slice(0, 2).map((item) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                gap: 2,
                mb: 2,
                alignItems: 'center'
              }}
            >
              <Avatar src={item.image} variant="rounded" sx={{ width: 48, height: 48 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" noWrap>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Qty: {item.quantity}
                </Typography>
              </Box>
              <Typography variant="subtitle2">
                ${(item.price * item.quantity).toFixed(2)}
              </Typography>
            </Box>
          ))}
          {items.length > 2 && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              And {items.length - 2} more items...
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">Subtotal</Typography>
            <Typography>${subtotal.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">Shipping</Typography>
            <Typography>${shipping.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">Taxes</Typography>
            <Typography>${taxes.toFixed(2)}</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'primary.light',
            p: 2,
            borderRadius: 1,
            mt: 2
          }}
        >
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">${finalTotal.toFixed(2)}</Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
            <LocalShipping color="primary" />
            <Typography variant="subtitle2">Free Shipping</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Estimated delivery: 3-5 business days
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

OrderSummary.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired
    })
  ).isRequired,
  subtotal: PropTypes.number.isRequired,
  shipping: PropTypes.number.isRequired,
  taxes: PropTypes.number.isRequired,
  finalTotal: PropTypes.number.isRequired
};

export { OrderSummary };
