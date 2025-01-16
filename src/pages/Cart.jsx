import React from 'react';
import { CartItemList, CartSummary, EmptyCart } from '../components';
import { Box, Typography, Button, Grid } from '@mui/material';
import { RemoveShoppingCart as ClearCartIcon } from '@mui/icons-material';
import { useCheckout } from '../hooks/useCheckout';

const Cart = () => {
  const {
    items,
    cartItemsCount,
    isEmpty,
    subtotal,
    shipping,
    taxes,
    finalTotal,
    handleIncrement,
    handleDecrement,
    handleCheckout,
    handleContinueShopping,
    clearCart,
    removeFromCart
  } = useCheckout();

  if (isEmpty) {
    return <EmptyCart onContinueShopping={handleContinueShopping} />;
  }

  return (
    <Box
      sx={{
        maxWidth: 1400,
        mx: 'auto',
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 5 }
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {`Shopping Cart (${cartItemsCount} items)`}
            </Typography>
            <Button
              onClick={clearCart}
              startIcon={<ClearCartIcon />}
              color="secondary"
              sx={{
                '&:hover': {
                  bgcolor: 'secondary.lighter'
                }
              }}
            >
              Clear Cart
            </Button>
          </Box>

          <Box sx={{ mt: 3 }}>
            <CartItemList
              items={items}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={removeFromCart}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <CartSummary
            subtotal={subtotal}
            shipping={shipping}
            taxes={taxes}
            finalTotal={finalTotal}
            onCheckout={handleCheckout}
            onContinueShopping={handleContinueShopping}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
