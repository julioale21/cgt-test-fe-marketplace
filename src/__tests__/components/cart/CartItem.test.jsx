import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartItem } from '../../../components';

describe('CartItem', () => {
  const mockItem = {
    id: 1,
    name: '3D Mountain Model',
    price: 29.99,
    image: '/test-image.jpg',
    quantity: 2
  };

  const defaultProps = {
    item: mockItem,
    onIncrement: jest.fn(),
    onDecrement: jest.fn(),
    onRemove: jest.fn()
  };

  it('matches snapshot', () => {
    const { container } = render(<CartItem {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('displays item details correctly', () => {
    render(<CartItem {...defaultProps} />);

    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockItem.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(mockItem.quantity.toString())).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockItem.image);
    expect(image).toHaveAttribute('alt', mockItem.name);
  });

  it('calls onIncrement when plus button is clicked', async () => {
    render(<CartItem {...defaultProps} />);
    const user = userEvent.setup();

    await user.click(screen.getByTestId('AddIcon').parentElement);
    expect(defaultProps.onIncrement).toHaveBeenCalledTimes(1);
  });

  it('calls onDecrement when minus button is clicked', async () => {
    render(<CartItem {...defaultProps} />);
    const user = userEvent.setup();

    await user.click(screen.getByTestId('RemoveIcon').parentElement);
    expect(defaultProps.onDecrement).toHaveBeenCalledTimes(1);
  });

  it('calls onRemove when delete button is clicked', async () => {
    render(<CartItem {...defaultProps} />);
    const user = userEvent.setup();

    await user.click(screen.getByTestId('DeleteIcon').parentElement);
    expect(defaultProps.onRemove).toHaveBeenCalledTimes(1);
  });

  it('applies correct styles to the image', () => {
    render(<CartItem {...defaultProps} />);
    const image = screen.getByRole('img');

    expect(image).toHaveStyle({
      width: '80px',
      height: '80px',
      objectFit: 'cover'
    });
  });

  it('applies small size to all icon buttons', () => {
    render(<CartItem {...defaultProps} />);
    const buttons = screen.getAllByRole('button');

    buttons.forEach((button) => {
      expect(button).toHaveClass('MuiIconButton-sizeSmall');
    });
  });

  it('applies error color to delete button', () => {
    render(<CartItem {...defaultProps} />);
    const deleteButton = screen.getByTestId('DeleteIcon').parentElement;

    expect(deleteButton).toHaveClass('MuiIconButton-colorError');
  });

  it('centers quantity display', () => {
    render(<CartItem {...defaultProps} />);
    const quantityElement = screen.getByText(mockItem.quantity.toString());

    expect(quantityElement).toHaveStyle({
      textAlign: 'center',
      minWidth: '32px'
    });
  });

  it('formats price with 2 decimal places', () => {
    const itemWithLongPrice = {
      ...mockItem,
      price: 29.9999
    };

    render(<CartItem {...defaultProps} item={itemWithLongPrice} />);
    expect(screen.getByText('$30.00')).toBeInTheDocument();
  });

  it('handles missing image gracefully', () => {
    const itemWithoutImage = {
      ...mockItem,
      image: ''
    };

    render(<CartItem {...defaultProps} item={itemWithoutImage} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '');
    expect(image).toBeInTheDocument();
  });
});
