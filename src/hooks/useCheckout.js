import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './useCart';


export const useCheckout = () => {
  const navigate = useNavigate();
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart();

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
    alert('Checkout not yet implemented');
  };

  const handleContinueShopping = () => {
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
    clearCart,
    removeFromCart
  };
};