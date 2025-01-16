import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmptyCart } from '../../../components';


describe('EmptyCart', () => {
  const defaultProps = {
    onContinueShopping: jest.fn()
  };

  it('matches snapshot', () => {
    const { container } = render(<EmptyCart {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('displays empty cart message', () => {
    render(<EmptyCart {...defaultProps} />);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('renders shopping cart icon', () => {
    render(<EmptyCart {...defaultProps} />);
    expect(screen.getByTestId('ShoppingCartIcon')).toBeInTheDocument();
  });

  it('renders continue shopping button with correct text', () => {
    render(<EmptyCart {...defaultProps} />);
    expect(screen.getByText('Continue Shopping')).toBeInTheDocument();
  });

  it('renders back arrow icon in button', () => {
    render(<EmptyCart {...defaultProps} />);
    expect(screen.getByTestId('ArrowBackIcon')).toBeInTheDocument();
  });

  it('calls onContinueShopping when button is clicked', async () => {
    render(<EmptyCart {...defaultProps} />);
    const user = userEvent.setup();

    await user.click(screen.getByText('Continue Shopping'));
    expect(defaultProps.onContinueShopping).toHaveBeenCalledTimes(1);
  });

  it('renders card with correct max width', () => {
    render(<EmptyCart {...defaultProps} />);
    const card = screen.getByText('Your cart is empty').closest('.MuiCard-root');

    expect(card).toHaveStyle({
      maxWidth: '800px'
    });
  });
});
