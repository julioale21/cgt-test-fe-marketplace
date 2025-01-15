import React from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Divider,
  Paper,
  Grid,
  Stack
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { OutlinedButton, CartSummary } from '../components';


const Cart = () => {
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const shipping = 0;
  const subtotal = total;
  const taxes = total * 0.1;
  const finalTotal = subtotal + shipping + taxes;

  const handleIncrement = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleCheckout = () => {
    alert('Checkout not yet implemented');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <ShoppingCartIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography color="text.secondary" gutterBottom>
            Your cart is empty
          </Typography>
          <OutlinedButton
            startIcon={<ArrowBackIcon />}
            onClick={handleContinueShopping}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </OutlinedButton>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid container spacing={3} sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      <Grid item xs={12} md={8} sx={{ order: { xs: 1, md: 1 } }}>
        <Card>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Shopping Cart ({items.length} items)</Typography>
                <OutlinedButton size="small" onClick={clearCart}>
                  Clear Cart
                </OutlinedButton>
              </Box>
            }
          />
          <Divider />
          <CardContent>
            <Stack spacing={2}>
              {items.map((item) => (
                <Paper key={item.id} elevation={1} sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: 1
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${item.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton size="small" onClick={() => handleDecrement(item)}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography sx={{ minWidth: 32, textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>
                      <IconButton size="small" onClick={() => handleIncrement(item)}>
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4} sx={{ order: { xs: 2, md: 2 } }}>
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
  );
};

export default Cart;
