import { renderHook, act } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../../hooks/useProduct';
import { products } from '../../constants/products';
import { useCart } from '../../hooks/useCart';


// Mock the dependent hooks
jest.mock('react-router-dom', () => ({
  useParams: jest.fn()
}));

jest.mock('../../hooks/useCart', () => ({
  useCart: jest.fn()
}));

describe('useProduct', () => {
  const mockAddToCart = jest.fn();
  
  beforeEach(() => {
    // Setup default mock implementations
    useParams.mockReturnValue({ productId: '1' });
    useCart.mockReturnValue({
      addToCart: mockAddToCart,
      items: []
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find and return the correct product', () => {
    const { result } = renderHook(() => useProduct());
    
    expect(result.current.product).toEqual(products[0]);
    expect(result.current.isInCart).toBe(false);
  });

  it('should handle non-existent product ID', () => {
    useParams.mockReturnValue({ productId: '999' });
    
    const { result } = renderHook(() => useProduct());
    
    expect(result.current.product).toBeUndefined();
    expect(result.current.isInCart).toBe(false);
  });

  it('should correctly identify if product is in cart', () => {
    useCart.mockReturnValue({
      addToCart: mockAddToCart,
      items: [{ id: 1, name: 'Product 1', price: 10 }]
    });
    
    const { result } = renderHook(() => useProduct());
    
    expect(result.current.isInCart).toBe(true);
  });

  it('should successfully add product to cart', () => {
    const { result } = renderHook(() => useProduct());
    
    act(() => {
      const success = result.current.handleAddToCart();
      expect(success).toBe(true);
    });
    
    expect(mockAddToCart).toHaveBeenCalledWith(products[0]);
  });

  it('should handle add to cart for non-existent product', () => {
    useParams.mockReturnValue({ productId: '999' });
    
    const { result } = renderHook(() => useProduct());
    
    act(() => {
      const success = result.current.handleAddToCart();
      expect(success).toBe(false);
    });
    
    expect(mockAddToCart).not.toHaveBeenCalled();
  });
});