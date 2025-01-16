import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartItemList } from '../../../components';

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  Stack: ({ children, spacing }) => (
    <div data-testid="mui-stack" className="MuiStack-root" data-spacing={spacing}>
      {children}
    </div>
  ),
  Box: ({ children, ...props }) => (
    <div {...props} className="MuiBox-root">
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

  it('should match snapshot', () => {
    const props = { ...defaultProps };
    const { container } = render(<CartItemList {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correct number of CartItem components', () => {
    const props = { ...defaultProps };
    render(<CartItemList {...props} />);
    const cartItems = screen.getAllByTestId(/^cart-item-/);
    expect(cartItems).toHaveLength(mockItems.length);
  });

  it('should render items in correct order with all required elements', () => {
    const props = { ...defaultProps };
    render(<CartItemList {...props} />);

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

  it('should call onIncrement with correct item', async () => {
    const props = { ...defaultProps };
    const user = userEvent.setup();

    render(<CartItemList {...props} />);
    await user.click(screen.getByTestId('increment-1'));

    expect(props.onIncrement).toHaveBeenCalledTimes(1);
    expect(props.onIncrement).toHaveBeenCalledWith(mockItems[0]);
  });

  it('should call onDecrement with correct item', async () => {
    const props = { ...defaultProps };
    const user = userEvent.setup();

    render(<CartItemList {...props} />);
    await user.click(screen.getByTestId('decrement-2'));

    expect(props.onDecrement).toHaveBeenCalledTimes(1);
    expect(props.onDecrement).toHaveBeenCalledWith(mockItems[1]);
  });

  it('should call onRemove with correct item id', async () => {
    const props = { ...defaultProps };
    const user = userEvent.setup();

    render(<CartItemList {...props} />);
    await user.click(screen.getByTestId('remove-1'));

    expect(props.onRemove).toHaveBeenCalledTimes(1);
    expect(props.onRemove).toHaveBeenCalledWith(mockItems[0].id);
  });

  it('should handle empty items array', () => {
    const props = { ...defaultProps, items: [] };
    render(<CartItemList {...props} />);
    const cartItems = screen.queryAllByTestId(/^cart-item-/);
    expect(cartItems).toHaveLength(0);
  });
});
