import { StorageService } from "../storage/storageService";


const CART_STORAGE_KEY = 'cart';

class CartStorageService extends StorageService {
  constructor() {
    super(CART_STORAGE_KEY);
  }

  getCart() {
    const cart = this.get();
    if (!cart) return null;

    try {
      if (!Array.isArray(cart.items) || typeof cart.total !== 'number') {
        throw new Error('Invalid cart structure');
      }

      const isValidItem = (item) => (
        item &&
        typeof item.id === 'number' &&
        typeof item.price === 'number' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0
      );

      if (!cart.items.every(isValidItem)) {
        throw new Error('Invalid cart items');
      }

      return cart;
    } catch (error) {
      console.error('Error parsing cart data:', error);
      this.remove();
      return null;
    }
  }

  saveCart(cartState) {
    if (!cartState || !Array.isArray(cartState.items)) {
      console.error('Invalid cart state');
      return;
    }
    this.set(cartState);
  }

  clearCart() {
    this.remove();
  }
}

export const cartStorage = new CartStorageService();