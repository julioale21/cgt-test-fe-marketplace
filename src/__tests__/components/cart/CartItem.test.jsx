import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CartItem } from '../../../components';

const theme = createTheme();

const customRender = (ui, options) =>
  render(ui, {
    wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
    ...options
  });

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
    const { container } = customRender(<CartItem {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should display all item details correctly', () => {
    const props = { ...defaultProps };
    customRender(<CartItem {...props} />);

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
    customRender(<CartItem {...props} />);

    const addButton = screen.getByTestId('AddIcon').closest('button');
    await user.click(addButton);

    expect(props.onIncrement).toHaveBeenCalledTimes(1);
  });

  it('should call onDecrement when minus button is clicked', async () => {
    const props = { ...defaultProps };
    const user = userEvent.setup();
    customRender(<CartItem {...props} />);

    const minusButton = screen.getByTestId('RemoveIcon').closest('button');
    await user.click(minusButton);

    expect(props.onDecrement).toHaveBeenCalledTimes(1);
  });

  it('should call onRemove when delete button is clicked', async () => {
    const props = { ...defaultProps };
    const user = userEvent.setup();
    customRender(<CartItem {...props} />);

    const deleteButton = screen.getByTestId('DeleteIcon').closest('button');
    await user.click(deleteButton);

    expect(props.onRemove).toHaveBeenCalledTimes(1);
  });

  it('should apply correct styles to the image', () => {
    const props = { ...defaultProps };
    customRender(<CartItem {...props} />);
    const image = screen.getByRole('img');

    expect(image.className).toMatch(/MuiBox-root/);
    const styles = window.getComputedStyle(image);
    expect(styles.objectFit).toBe('cover');
  });

  it('should apply small size to all icon buttons', () => {
    const props = { ...defaultProps };
    customRender(<CartItem {...props} />);
    const buttons = screen.getAllByRole('button');

    buttons.forEach((button) => {
      expect(button.className).toMatch(/MuiIconButton-sizeSmall/);
    });
  });

  it('should apply error color to delete button', () => {
    const props = { ...defaultProps };
    customRender(<CartItem {...props} />);
    const deleteButton = screen.getByTestId('DeleteIcon').closest('button');

    expect(deleteButton.className).toMatch(/MuiIconButton-colorError/);
  });

  it('should center quantity display', () => {
    const props = { ...defaultProps };
    customRender(<CartItem {...props} />);
    const quantityElement = screen.getByText(mockItem.quantity.toString());

    const styles = window.getComputedStyle(quantityElement);
    expect(styles.textAlign).toBe('center');
  });

  it('should format price with 2 decimal places', () => {
    const itemWithLongPrice = {
      ...mockItem,
      price: 29.9999
    };
    const props = { ...defaultProps, item: itemWithLongPrice };

    customRender(<CartItem {...props} />);

    expect(screen.getByText('$30.00')).toBeInTheDocument();
  });

  it('should handle missing image gracefully', () => {
    const itemWithoutImage = {
      ...mockItem,
      image: ''
    };
    const props = { ...defaultProps, item: itemWithoutImage };

    customRender(<CartItem {...props} />);
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', '');
    expect(image).toBeInTheDocument();
  });
});
