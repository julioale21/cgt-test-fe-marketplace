import React from 'react';
import { Box } from '@mui/material';
import { useCheckout } from '../hooks/useCheckout';
import { OrderSummary, PaymentSuccessModal, PaymentForm } from '../components';

const Checkout = () => {
  const {
    subtotal,
    shipping,
    taxes,
    finalTotal,
    handlePaymentSuccess,
    paymentSuccess,
    handleCloseSuccessModal,
    items
  } = useCheckout();

  const onSubmit = (data) => {
    setTimeout(() => {
      handlePaymentSuccess({
        ...data,
        amount: finalTotal,
        orderId: Math.random().toString(36).substr(2, 9)
      });
    }, 1500);
  };

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: 'auto',
        p: 3,
        display: 'flex',
        gap: 4,
        flexDirection: { xs: 'column', md: 'row' }
      }}
    >
      <OrderSummary
        items={items}
        subtotal={subtotal}
        shipping={shipping}
        taxes={taxes}
        finalTotal={finalTotal}
      />

      <PaymentForm onSubmit={onSubmit} finalTotal={finalTotal} />

      <PaymentSuccessModal
        paymentSuccess={paymentSuccess}
        handleCloseSuccessModal={handleCloseSuccessModal}
      />
    </Box>
  );
};

export default Checkout;
