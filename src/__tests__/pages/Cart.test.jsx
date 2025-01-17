import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as useCartHook from '../../hooks/useCart';
import { CartProvider } from '../../context/cart/cartProvider';
import Cart from '../../pages/Cart';

jest.mock('../../hooks/useCart');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('Cart', () => {
  const mockNavigate = jest.fn();
  const mockUpdateQuantity = jest.fn();
  const mockRemoveFromCart = jest.fn();
  const mockClearCart = jest.fn();

  const mockItems = [
    {
      id: 1,
      name: 'Test Product',
      price: 29.99,
      quantity: 2,
      image: 'test.jpg'
    }
  ];

  const renderCart = (mockItems = []) => {
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);

    useCartHook.useCart.mockReturnValue({
      items: mockItems,
      total: mockItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      removeFromCart: mockRemoveFromCart,
      updateQuantity: mockUpdateQuantity,
      clearCart: mockClearCart,
      cartItemsCount: mockItems.reduce((acc, item) => acc + item.quantity, 0),
      isEmpty: mockItems.length === 0
    });

    return render(
      <MemoryRouter>
        <CartProvider>
          <Cart />
        </CartProvider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot with empty cart', () => {
    const { container } = renderCart([]);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with items in cart', () => {
    const { container } = renderCart(mockItems);
    expect(container).toMatchSnapshot();
  });

  it('should render EmptyCart component when cart is empty', () => {
    renderCart([]);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('should render cart content when items exist', () => {
    renderCart(mockItems);
    const cartItemsCount = mockItems.reduce((acc, item) => acc + item.quantity, 0);
    expect(screen.getByText(`Shopping Cart (${cartItemsCount} items)`)).toBeInTheDocument();
    expect(screen.getByText(mockItems[0].name)).toBeInTheDocument();
  });

  it('should call updateQuantity when increment button is clicked', () => {
    renderCart(mockItems);
    const incrementButton = screen.getByTestId('AddIcon').parentElement;
    fireEvent.click(incrementButton);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockItems[0].id, mockItems[0].quantity + 1);
  });

  it('should call updateQuantity when decrement button is clicked and quantity > 1', () => {
    renderCart(mockItems);
    const decrementButton = screen.getByTestId('RemoveIcon').parentElement;
    fireEvent.click(decrementButton);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockItems[0].id, mockItems[0].quantity - 1);
  });

  it('should call removeFromCart when decrement button is clicked and quantity is 1', () => {
    const itemWithQuantityOne = [
      {
        ...mockItems[0],
        quantity: 1
      }
    ];
    renderCart(itemWithQuantityOne);
    const decrementButton = screen.getByTestId('RemoveIcon').parentElement;
    fireEvent.click(decrementButton);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(itemWithQuantityOne[0].id);
  });

  it('should call clearCart when clear cart button is clicked', () => {
    renderCart(mockItems);
    fireEvent.click(screen.getByText('Clear Cart'));
    expect(mockClearCart).toHaveBeenCalled();
  });

  it('should navigate to checkout when checkout button is clicked', () => {
    renderCart(mockItems);

    fireEvent.click(screen.getByText('Continue to Checkout'));

    expect(mockNavigate).toHaveBeenCalledWith('/checkout');
  });

  it('should navigate to home when continue shopping is clicked', () => {
    renderCart(mockItems);
    fireEvent.click(screen.getByText('Continue Shopping'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should calculate correct totals', () => {
    renderCart(mockItems);
    const subtotal = mockItems[0].price * mockItems[0].quantity;
    const taxes = subtotal * 0.1;
    const finalTotal = subtotal + taxes;

    expect(screen.getByText(`$${subtotal.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(`$${taxes.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(`$${finalTotal.toFixed(2)}`)).toBeInTheDocument();
  });
});
