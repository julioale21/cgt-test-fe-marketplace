import { useReducer, useCallback } from 'react';
import { cartReducer } from './cartReducer';
import { initialState, CART_ACTIONS } from './types';
import { CartContext } from './cartContext';

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = useCallback(({ product, quantity }) => {
    if (!product || product.price === undefined || quantity === undefined) {
      throw new Error("Invalid product or quantity passed to addToCart");
    }
    dispatch({ 
      type: CART_ACTIONS.ADD_TO_CART, 
      payload: { product, quantity }
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    dispatch({ 
      type: CART_ACTIONS.REMOVE_FROM_CART, 
      payload: productId 
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id: productId, quantity }
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  }, []);

  const value = {
    items: state.items,
    total: state.total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
