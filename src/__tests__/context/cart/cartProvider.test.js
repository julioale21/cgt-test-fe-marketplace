import { render, act } from '@testing-library/react';
import { useContext } from 'react';
import { CartContext } from '../../../context/cart/cartContext';
import { CartProvider } from '../../../context/cart/cartProvider';

const TestComponent = ({ onMount }) => {
  const context = useContext(CartContext);
  onMount(context);
  return null;
};

describe('CartProvider', () => {
  const sampleProduct = {
    id: 1,
    name: 'Test Product',
    price: 10.00
  };

  it('should provide initial cart state', () => {
    let contextValue;
    render(
      <CartProvider>
        <TestComponent onMount={(context) => { contextValue = context; }} />
      </CartProvider>
    );

    expect(contextValue.items).toEqual([]);
    expect(contextValue.total).toBe(0);
    expect(typeof contextValue.addToCart).toBe('function');
    expect(typeof contextValue.removeFromCart).toBe('function');
    expect(typeof contextValue.updateQuantity).toBe('function');
    expect(typeof contextValue.clearCart).toBe('function');
  });

  it('should add item to cart', () => {
    let contextValue;
    render(
      <CartProvider>
        <TestComponent onMount={(context) => { contextValue = context; }} />
      </CartProvider>
    );

    act(() => {
      contextValue.addToCart(sampleProduct);
    });

    expect(contextValue.items).toHaveLength(1);
    expect(contextValue.items[0]).toEqual({ ...sampleProduct, quantity: 1 });
    expect(contextValue.total).toBe(10.00);
  });

  it('should remove item from cart', () => {
    let contextValue;
    render(
      <CartProvider>
        <TestComponent onMount={(context) => { contextValue = context; }} />
      </CartProvider>
    );

    act(() => {
      contextValue.addToCart(sampleProduct);
      contextValue.removeFromCart(sampleProduct.id);
    });

    expect(contextValue.items).toHaveLength(0);
    expect(contextValue.total).toBe(0);
  });

  it('should update item quantity', () => {
    let contextValue;
    render(
      <CartProvider>
        <TestComponent onMount={(context) => { contextValue = context; }} />
      </CartProvider>
    );

    act(() => {
      contextValue.addToCart(sampleProduct);
      contextValue.updateQuantity(sampleProduct.id, 3);
    });

    expect(contextValue.items[0].quantity).toBe(3);
    expect(contextValue.total).toBe(30.00);
  });

  it('should clear cart', () => {
    let contextValue;
    render(
      <CartProvider>
        <TestComponent onMount={(context) => { contextValue = context; }} />
      </CartProvider>
    );

    act(() => {
      contextValue.addToCart(sampleProduct);
      contextValue.addToCart({ ...sampleProduct, id: 2, name: 'Another Product' });
      contextValue.clearCart();
    });

    expect(contextValue.items).toHaveLength(0);
    expect(contextValue.total).toBe(0);
  });

  it('should persist state between renders', () => {
    let contextValue;
    const { rerender } = render(
      <CartProvider>
        <TestComponent onMount={(context) => { contextValue = context; }} />
      </CartProvider>
    );

    act(() => {
      contextValue.addToCart(sampleProduct);
    });

    rerender(
      <CartProvider>
        <TestComponent onMount={(context) => { contextValue = context; }} />
      </CartProvider>
    );

    expect(contextValue.items).toHaveLength(1);
    expect(contextValue.total).toBe(10.00);
  });
});