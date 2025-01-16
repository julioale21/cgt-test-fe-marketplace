import { cartStorage } from "../../../services/cart/cartStorage";


describe('CartStorageService', () => {
  const mockCart = {
    items: [
      { id: 1, price: 10, quantity: 2, name: 'Test Item' }
    ],
    total: 20
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('should save and retrieve cart data', () => {
    cartStorage.saveCart(mockCart);
    const savedCart = cartStorage.getCart();

    expect(savedCart).toEqual(mockCart);
  });

  it('should return null for invalid cart structure', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    localStorage.setItem('cart', JSON.stringify({ 
      items: 'not an array',
      total: 'not a number'
    }));

    const savedCart = cartStorage.getCart();
    expect(savedCart).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should return null for invalid cart items', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    localStorage.setItem('cart', JSON.stringify({
      items: [{ id: 'not a number', price: 'invalid' }],
      total: 0
    }));

    const savedCart = cartStorage.getCart();
    expect(savedCart).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should not save invalid cart state', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    cartStorage.saveCart(null);
    expect(localStorage.getItem('cart')).toBeNull();

    cartStorage.saveCart({ items: 'not an array' });
    expect(localStorage.getItem('cart')).toBeNull();

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should clear cart data', () => {
    cartStorage.saveCart(mockCart);
    expect(cartStorage.getCart()).toEqual(mockCart);

    cartStorage.clearCart();
    expect(cartStorage.getCart()).toBeNull();
  });

  it('should handle storage quota exceeded', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });

    cartStorage.saveCart(mockCart);
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});