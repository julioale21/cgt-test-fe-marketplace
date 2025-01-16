import { renderHook, act } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useCheckout } from '../../hooks/useCheckout';

jest.mock('../../hooks/useCart');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('useCheckout', () => {
  const mockItems = [
    { id: 1, name: 'Item 1', price: 10, quantity: 2 },
    { id: 2, name: 'Item 2', price: 20, quantity: 1 }
  ];

  const mockNavigate = jest.fn();
  const mockUpdateQuantity = jest.fn();
  const mockRemoveFromCart = jest.fn();
  const mockClearCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    useCart.mockReturnValue({
      items: mockItems,
      total: 40,
      updateQuantity: mockUpdateQuantity,
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart
    });
  });

  it('should calculate cart items count correctly', () => {
    const { result } = renderHook(() => useCheckout());
    expect(result.current.cartItemsCount).toBe(3);
  });

  it('should calculate order summary correctly', () => {
    const { result } = renderHook(() => useCheckout());
    
    expect(result.current.subtotal).toBe(40);
    expect(result.current.shipping).toBe(0);
    expect(result.current.taxes).toBe(4);
    expect(result.current.finalTotal).toBe(44);
  });

  it('should handle increment correctly', () => {
    const { result } = renderHook(() => useCheckout());
    const item = mockItems[0];

    act(() => {
      result.current.handleIncrement(item);
    });

    expect(mockUpdateQuantity).toHaveBeenCalledWith(item.id, item.quantity + 1);
  });

  it('should handle decrement correctly when quantity > 1', () => {
    const { result } = renderHook(() => useCheckout());
    const item = mockItems[0];

    act(() => {
      result.current.handleDecrement(item);
    });

    expect(mockUpdateQuantity).toHaveBeenCalledWith(item.id, item.quantity - 1);
    expect(mockRemoveFromCart).not.toHaveBeenCalled();
  });

  it('should remove item when decrementing at quantity 1', () => {
    const { result } = renderHook(() => useCheckout());
    const item = mockItems[1];

    act(() => {
      result.current.handleDecrement(item);
    });

    expect(mockUpdateQuantity).not.toHaveBeenCalled();
    expect(mockRemoveFromCart).toHaveBeenCalledWith(item.id);
  });

  it('should handle checkout correctly', () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const { result } = renderHook(() => useCheckout());

    act(() => {
      result.current.handleCheckout();
    });

    expect(mockAlert).toHaveBeenCalledWith('Checkout not yet implemented');
    mockAlert.mockRestore();
  });

  it('should handle continue shopping correctly', () => {
    const { result } = renderHook(() => useCheckout());

    act(() => {
      result.current.handleContinueShopping();
    });

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should pass through cart clearing functionality', () => {
    const { result } = renderHook(() => useCheckout());

    act(() => {
      result.current.clearCart();
    });

    expect(mockClearCart).toHaveBeenCalled();
  });

  it('should pass through cart item removal functionality', () => {
    const { result } = renderHook(() => useCheckout());
    const itemId = 1;

    act(() => {
      result.current.removeFromCart(itemId);
    });

    expect(mockRemoveFromCart).toHaveBeenCalledWith(itemId);
  });

  it('should determine if cart is empty correctly', () => {
    const { result, rerender } = renderHook(() => useCheckout());
    expect(result.current.isEmpty).toBe(false);

    useCart.mockReturnValue({
      items: [],
      total: 0,
      updateQuantity: mockUpdateQuantity,
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart
    });
    rerender();
    
    expect(result.current.isEmpty).toBe(true);
  });

  it('should recalculate order summary when total changes', () => {
    const { result, rerender } = renderHook(() => useCheckout());
    expect(result.current.subtotal).toBe(40);
    expect(result.current.finalTotal).toBe(44);

    useCart.mockReturnValue({
      items: mockItems,
      total: 60,
      updateQuantity: mockUpdateQuantity,
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart
    });
    rerender();

    expect(result.current.subtotal).toBe(60);
    expect(result.current.finalTotal).toBe(66);
  });
});