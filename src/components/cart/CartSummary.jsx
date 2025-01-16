import React from 'react';
import { Box, Card, CardContent, CardHeader, Typography, Divider, Stack } from '@mui/material';
import PropTypes from 'prop-types';

import {
  ArrowBack as ArrowBackIcon,
  CreditCard as CreditCardIcon,
  LocalShipping as ShippingIcon
} from '@mui/icons-material';

import {
  CartSummaryRow,
  ContainedButton,
  OutlinedButton,
  PaymentMethodIcon
} from '../../components';

const CartSummary = ({
  subtotal,
  shipping = 0,
  taxes,
  finalTotal,
  onCheckout,
  onContinueShopping
}) => {
  return (
    <Card sx={{ position: { md: 'sticky' }, top: { md: '24px' } }}>
      <CardHeader title="Order Summary" />
      <Divider />
      <CardContent>
        <Stack spacing={2}>
          <CartSummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
          <CartSummaryRow
            label="Shipping"
            value={shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          />
          <CartSummaryRow label="Estimated tax" value={`$${taxes.toFixed(2)}`} />
          <Divider />
          <CartSummaryRow
            label="Total"
            value={`$${finalTotal.toFixed(2)}`}
            variant="h6"
            labelColor="text.primary"
          />

          <ContainedButton
            fullWidth
            onClick={onCheckout}
            startIcon={<CreditCardIcon />}
            sx={{ py: 1.5 }}
          >
            Continue to Checkout
          </ContainedButton>

          <OutlinedButton
            fullWidth
            onClick={onContinueShopping}
            startIcon={<ArrowBackIcon />}
            sx={{ py: 1.5 }}
          >
            Continue Shopping
          </OutlinedButton>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
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
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <ShippingIcon fontSize="small" />
              Free shipping on all orders
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

CartSummary.propTypes = {
  subtotal: PropTypes.number.isRequired,
  shipping: PropTypes.number,
  taxes: PropTypes.number.isRequired,
  finalTotal: PropTypes.number.isRequired,
  onCheckout: PropTypes.func.isRequired,
  onContinueShopping: PropTypes.func.isRequired
};

export { CartSummary };
