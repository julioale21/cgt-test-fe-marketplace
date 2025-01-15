import { renderHook } from '@testing-library/react';
import { CartContext } from '../../context/cart/cartContext';
import { useCart } from '../../hooks/useCart';


const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*Context/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

describe('useCart', () => {
  const mockCartContext = {
    items: [],
    total: 0,
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn()
  };

  const Wrapper = ({ children }) => (
    <CartContext.Provider value={mockCartContext}>
      {children}
    </CartContext.Provider>
  );

  describe('when used inside CartProvider', () => {
    it('should return cart context with all properties and methods', () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: Wrapper
      });

      expect(result.current).toEqual(mockCartContext);
      expect(result.current.items).toEqual([]);
      expect(result.current.total).toBe(0);
      expect(typeof result.current.addToCart).toBe('function');
      expect(typeof result.current.removeFromCart).toBe('function');
      expect(typeof result.current.updateQuantity).toBe('function');
      expect(typeof result.current.clearCart).toBe('function');
    });

    it('should maintain context reference between rerenders', () => {
      const { result, rerender } = renderHook(() => useCart(), {
        wrapper: Wrapper
      });
      
      const firstRenderResult = result.current;
      rerender();
      
      expect(result.current).toBe(firstRenderResult);
    });
  });

  describe('when used outside CartProvider', () => {
    it('should throw appropriate error', () => {
      const consoleSpy = jest.spyOn(console, 'error');
      consoleSpy.mockImplementation(() => {});

      expect(() => {
        renderHook(() => useCart());
      }).toThrow('useCart debe usarse dentro de un CartProvider');

      consoleSpy.mockRestore();
    });
  });
});