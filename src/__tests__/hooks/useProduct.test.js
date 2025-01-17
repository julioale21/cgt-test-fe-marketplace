import { renderHook, act } from '@testing-library/react';
import { MemoryRouter, useParams } from 'react-router-dom';
import { products } from '../../constants/products';
import { useCart } from '../../hooks/useCart';
import { CartContext } from '../../context/cart/cartContext';
import { useProduct } from '../../hooks/useProduct';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}));

jest.mock('../../hooks/useCart', () => ({
  useCart: jest.fn()
}));

describe('useProduct', () => {
  const mockAddToCart = jest.fn();
  const mockCartContextValue = {
    items: [],
    total: 0,
    addToCart: mockAddToCart,
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn()
  };
  
  beforeEach(() => {
    useParams.mockReturnValue({ productId: '1' });
    useCart.mockReturnValue({
      addToCart: mockAddToCart,
      items: []
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const createWrapper = (contextValue = mockCartContextValue) => {
    const TestWrapper = ({ children }) => (
      <MemoryRouter initialEntries={['/products/1']}>
        <CartContext.Provider value={contextValue}>
          {children}
        </CartContext.Provider>
      </MemoryRouter>
    );
    TestWrapper.displayName = 'TestWrapper';
    return TestWrapper;
  };

  it('should find and return the correct product', () => {
    const { result } = renderHook(() => useProduct(), {
      wrapper: createWrapper()
    });
    
    expect(result.current.product).toEqual(products[0]);
    expect(result.current.isInCart).toBe(false);
  });

  it('should handle non-existent product ID', () => {
    useParams.mockReturnValue({ productId: '999' });
    
    const { result } = renderHook(() => useProduct(), {
      wrapper: createWrapper()
    });
    
    expect(result.current.product).toBeUndefined();
    expect(result.current.isInCart).toBe(false);
  });

  it('should correctly identify if product is in cart', () => {
    const contextWithItems = {
      ...mockCartContextValue,
      items: [{ id: 1, name: 'Product 1', price: 10 }]
    };
    
    useCart.mockReturnValue({
      addToCart: mockAddToCart,
      items: contextWithItems.items
    });
    
    const { result } = renderHook(() => useProduct(), {
      wrapper: createWrapper(contextWithItems)
    });
    
    expect(result.current.isInCart).toBe(true);
  });

  it('should successfully add product to cart', () => {
    const { result } = renderHook(() => useProduct(), {
      wrapper: createWrapper()
    });
  
    act(() => {
      result.current.handleAddToCart();
    });
    
    expect(mockAddToCart).toHaveBeenCalledWith({
      product: products[0],
      quantity: 1
    });
  });

  it('should handle add to cart for non-existent product', () => {
    useParams.mockReturnValue({ productId: '999' });
    
    const { result } = renderHook(() => useProduct(), {
      wrapper: createWrapper()
    });
    
    let success;
    act(() => {
      success = result.current.handleAddToCart();
    });
    
    expect(success).toBe(false);
    expect(mockAddToCart).not.toHaveBeenCalled();
  });
});