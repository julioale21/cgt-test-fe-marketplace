import React from 'react';
import { useCart } from '../hooks/useCart';
import { CartHeader, CartItemList, CartSummary, EmptyCart } from '../components';
import { Card, CardContent, Divider, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
    return <EmptyCart onContinueShopping={handleContinueShopping} />;
  }

  return (
    <Grid container spacing={3} sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      <Grid item xs={12} md={8} sx={{ order: { xs: 1, md: 1 } }}>
        <Card>
          <CartHeader itemCount={items.length} onClearCart={clearCart} />
          <Divider />
          <CardContent>
            <CartItemList
              items={items}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={removeFromCart}
            />
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
