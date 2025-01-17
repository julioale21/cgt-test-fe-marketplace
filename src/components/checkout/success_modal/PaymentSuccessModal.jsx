import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Dialog, DialogContent } from '@mui/material';
import { ShoppingBag } from '@mui/icons-material';
import { SuccessHeader, OrderDetailsSection, ShippingSection } from '../../../components';

const PaymentSuccessModal = ({ paymentSuccess, handleCloseSuccessModal }) => {
  if (!paymentSuccess) return null;

  return (
    <Dialog
      open={!!paymentSuccess}
      onClose={handleCloseSuccessModal}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden'
        }
      }}
    >
      <DialogContent sx={{ mt: '80px', pt: 4, px: 3 }}>
        <Box>
          <SuccessHeader />

          <OrderDetailsSection orderId={paymentSuccess.orderId} amount={paymentSuccess.amount} />

          <ShippingSection
            email={paymentSuccess.email}
            address={paymentSuccess.address}
            city={paymentSuccess.city}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 4
            }}
          >
            <Button
              variant="contained"
              onClick={handleCloseSuccessModal}
              startIcon={<ShoppingBag />}
              sx={{
                borderRadius: 2,
                px: 4
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

PaymentSuccessModal.propTypes = {
  paymentSuccess: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired
  }),
  handleCloseSuccessModal: PropTypes.func.isRequired
};

export { PaymentSuccessModal };
