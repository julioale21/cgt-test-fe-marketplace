import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartItemList } from '../../../components';

jest.mock('@mui/material', () => ({
  Stack: ({ children, spacing }) => (
    <div data-testid="mui-stack" className="MuiStack-root" data-spacing={spacing}>
      {children}
    </div>
  )
}));

jest.mock('../../../components/cart/CartItem', () => ({
  CartItem: ({ item, onIncrement, onDecrement, onRemove }) => (
    <div className="MuiPaper-root" data-testid={`cart-item-${item.id}`}>
      <div>
        <span>{item.name}</span>
        <span>${item.price.toFixed(2)}</span>
        <button data-testid={`increment-${item.id}`} onClick={() => onIncrement()}>
          +
        </button>
        <span data-testid={`quantity-${item.id}`}>{item.quantity}</span>
        <button data-testid={`decrement-${item.id}`} onClick={() => onDecrement()}>
          -
        </button>
        <button data-testid={`remove-${item.id}`} onClick={() => onRemove()}>
          x
        </button>
      </div>
    </div>
  )
}));

describe('CartItemList', () => {
  const mockItems = [
    {
      id: 1,
      name: '3D Mountain Model',
      price: 29.99,
      image: '/mountain.jpg',
      quantity: 1
    },
    {
      id: 2,
      name: '3D Tree Model',
      price: 19.99,
      image: '/tree.jpg',
      quantity: 2
    }
  ];

  const defaultProps = {
    items: mockItems,
    onIncrement: jest.fn(),
    onDecrement: jest.fn(),
    onRemove: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    const { container } = render(<CartItemList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders correct number of CartItem components', () => {
    render(<CartItemList {...defaultProps} />);
    const cartItems = screen.getAllByTestId(/^cart-item-/);
    expect(cartItems).toHaveLength(mockItems.length);
  });

  it('renders items in correct order with all required elements', () => {
    render(<CartItemList {...defaultProps} />);
    const items = screen.getAllByTestId(/^cart-item-/);
    expect(items).toHaveLength(2);

    items.forEach((item, index) => {
      const mockItem = mockItems[index];
      expect(item).toHaveTextContent(mockItem.name);
      expect(item).toHaveTextContent(mockItem.price.toFixed(2));
      expect(screen.getByTestId(`quantity-${mockItem.id}`)).toHaveTextContent(
        mockItem.quantity.toString()
      );
    });
  });

  it('calls onIncrement with correct item', async () => {
    const user = userEvent.setup();
    render(<CartItemList {...defaultProps} />);

    const incrementButton = screen.getByTestId('increment-1');
    await user.click(incrementButton);

    expect(defaultProps.onIncrement).toHaveBeenCalledTimes(1);
    expect(defaultProps.onIncrement).toHaveBeenCalledWith(mockItems[0]);
  });

  it('calls onDecrement with correct item', async () => {
    const user = userEvent.setup();
    render(<CartItemList {...defaultProps} />);

    const decrementButton = screen.getByTestId('decrement-2');
    await user.click(decrementButton);

    expect(defaultProps.onDecrement).toHaveBeenCalledTimes(1);
    expect(defaultProps.onDecrement).toHaveBeenCalledWith(mockItems[1]);
  });

  it('calls onRemove with correct item id', async () => {
    const user = userEvent.setup();
    render(<CartItemList {...defaultProps} />);

    const removeButton = screen.getByTestId('remove-1');
    await user.click(removeButton);

    expect(defaultProps.onRemove).toHaveBeenCalledTimes(1);
    expect(defaultProps.onRemove).toHaveBeenCalledWith(mockItems[0].id);
  });

  it('handles empty items array', () => {
    render(<CartItemList {...defaultProps} items={[]} />);
    const stack = screen.getByTestId('mui-stack');
    expect(stack).toBeInTheDocument();
    expect(stack.children).toHaveLength(0);
  });
});
