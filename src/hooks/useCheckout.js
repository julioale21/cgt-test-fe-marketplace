import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './useCart';

export const useCheckout = () => {
  const navigate = useNavigate();
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const cartItemsCount = useMemo(() => 
    items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const orderSummary = useMemo(() => {
    const shipping = 0;
    const subtotal = total;
    const taxes = total * 0.1;
    const finalTotal = subtotal + shipping + taxes;

    return {
      subtotal,
      shipping,
      taxes,
      finalTotal
    };
  }, [total]);

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
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handlePaymentSuccess = (paymentData) => {
    setPaymentSuccess(paymentData);
    clearCart();
  };

  const handleCloseSuccessModal = () => {
    setPaymentSuccess(false);
    navigate('/');
  };

  return {
    items,
    cartItemsCount,
    isEmpty: items.length === 0,
    ...orderSummary,
    handleIncrement,
    handleDecrement,
    handleCheckout,
    handleContinueShopping,
    handlePaymentSuccess,
    handleCloseSuccessModal,
    paymentSuccess,
    clearCart,
    removeFromCart
  };
};