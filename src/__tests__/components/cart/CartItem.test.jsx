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

  it('should match snapshot', () => {
    const props = { ...defaultProps };

    const { container } = render(<CartItem {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should display all item details correctly', () => {
    const props = { ...defaultProps };

    render(<CartItem {...props} />);

    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockItem.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(mockItem.quantity.toString())).toBeInTheDocument();
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockItem.image);
    expect(image).toHaveAttribute('alt', mockItem.name);
  });

  it('should call onIncrement when plus button is clicked', async () => {
    const props = { ...defaultProps };
    const user = userEvent.setup();

    render(<CartItem {...props} />);
    await user.click(screen.getByTestId('AddIcon').parentElement);

    expect(props.onIncrement).toHaveBeenCalledTimes(1);
  });

  it('should call onDecrement when minus button is clicked', async () => {
    const props = { ...defaultProps };
    const user = userEvent.setup();

    render(<CartItem {...props} />);
    await user.click(screen.getByTestId('RemoveIcon').parentElement);

    expect(props.onDecrement).toHaveBeenCalledTimes(1);
  });

  it('should call onRemove when delete button is clicked', async () => {
    const props = { ...defaultProps };
    const user = userEvent.setup();

    render(<CartItem {...props} />);
    await user.click(screen.getByTestId('DeleteIcon').parentElement);

    expect(props.onRemove).toHaveBeenCalledTimes(1);
  });

  it('should apply correct styles to the image', () => {
    const props = { ...defaultProps };

    render(<CartItem {...props} />);
    const image = screen.getByRole('img');

    expect(image).toHaveStyle({
      width: '80px',
      height: '80px',
      objectFit: 'cover'
    });
  });

  it('should apply small size to all icon buttons', () => {
    const props = { ...defaultProps };

    render(<CartItem {...props} />);
    const buttons = screen.getAllByRole('button');

    buttons.forEach((button) => {
      expect(button).toHaveClass('MuiIconButton-sizeSmall');
    });
  });

  it('should apply error color to delete button', () => {
    const props = { ...defaultProps };

    render(<CartItem {...props} />);
    const deleteButton = screen.getByTestId('DeleteIcon').parentElement;

    expect(deleteButton).toHaveClass('MuiIconButton-colorError');
  });

  it('should center quantity display', () => {
    const props = { ...defaultProps };

    render(<CartItem {...props} />);
    const quantityElement = screen.getByText(mockItem.quantity.toString());

    expect(quantityElement).toHaveStyle({
      textAlign: 'center',
      minWidth: '32px'
    });
  });

  it('should format price with 2 decimal places', () => {
    const itemWithLongPrice = {
      ...mockItem,
      price: 29.9999
    };
    const props = { ...defaultProps, item: itemWithLongPrice };

    render(<CartItem {...props} />);

    expect(screen.getByText('$30.00')).toBeInTheDocument();
  });

  it('should handle missing image gracefully', () => {
    const itemWithoutImage = {
      ...mockItem,
      image: ''
    };
    const props = { ...defaultProps, item: itemWithoutImage };

    render(<CartItem {...props} />);
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', '');
    expect(image).toBeInTheDocument();
  });
});
