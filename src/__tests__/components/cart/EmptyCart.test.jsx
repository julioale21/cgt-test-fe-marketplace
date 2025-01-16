import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmptyCart } from '../../../components';

describe('EmptyCart', () => {
  const defaultProps = {
    onContinueShopping: jest.fn()
  };

  it('should match snapshot', () => {
    const props = { ...defaultProps };

    const { container } = render(<EmptyCart {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should display empty cart message', () => {
    const props = { ...defaultProps };

    render(<EmptyCart {...props} />);

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('should render shopping cart icon', () => {
    const props = { ...defaultProps };

    render(<EmptyCart {...props} />);

    expect(screen.getByTestId('ShoppingCartIcon')).toBeInTheDocument();
  });

  it('should render continue shopping button with correct text', () => {
    const props = { ...defaultProps };

    render(<EmptyCart {...props} />);

    expect(screen.getByText('Start Shopping')).toBeInTheDocument();
  });

  it('should render back arrow icon in button', () => {
    const props = { ...defaultProps };

    render(<EmptyCart {...props} />);

    expect(screen.getByTestId('ArrowBackIcon')).toBeInTheDocument();
  });

  it('should call start shopping when button is clicked', async () => {
    const props = { ...defaultProps };
    const user = userEvent.setup();

    render(<EmptyCart {...props} />);
    await user.click(screen.getByText('Start Shopping'));

    expect(props.onContinueShopping).toHaveBeenCalledTimes(1);
  });

  it('should render card with correct max width', () => {
    const props = { ...defaultProps };

    render(<EmptyCart {...props} />);
    const card = screen.getByText('Your cart is empty').closest('.MuiCard-root');

    expect(card).toHaveStyle({
      maxWidth: '800px'
    });
  });
});
