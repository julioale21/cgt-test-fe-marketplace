import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartSummary } from '../../../components';

describe('CartSummary', () => {
  const defaultProps = {
    subtotal: 99.99,
    shipping: 0,
    taxes: 8.99,
    finalTotal: 108.98,
    onCheckout: jest.fn(),
    onContinueShopping: jest.fn()
  };

  it('matches snapshot', () => {
    const { container } = render(<CartSummary {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders all components correctly', () => {
    render(<CartSummary {...defaultProps} />);

    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('$8.99')).toBeInTheDocument();
    expect(screen.getByText('$108.98')).toBeInTheDocument();

    expect(screen.getByText('Continue to Checkout')).toBeInTheDocument();
    expect(screen.getByText('Continue Shopping')).toBeInTheDocument();

    expect(screen.getByText('Secure Checkout')).toBeInTheDocument();
    expect(screen.getByText('Free shipping on all orders')).toBeInTheDocument();
  });

  it('displays shipping cost when not free', () => {
    const propsWithShipping = {
      ...defaultProps,
      shipping: 5.99
    };
    render(<CartSummary {...propsWithShipping} />);
    expect(screen.getByText('$5.99')).toBeInTheDocument();
  });

  it('calls onCheckout when checkout button is clicked', async () => {
    render(<CartSummary {...defaultProps} />);
    const user = userEvent.setup();
    await user.click(screen.getByText('Continue to Checkout'));
    expect(defaultProps.onCheckout).toHaveBeenCalledTimes(1);
  });

  it('calls onContinueShopping when continue shopping button is clicked', async () => {
    render(<CartSummary {...defaultProps} />);
    const user = userEvent.setup();
    await user.click(screen.getByText('Continue Shopping'));
    expect(defaultProps.onContinueShopping).toHaveBeenCalledTimes(1);
  });

  it('handles zero values correctly', () => {
    const zeroProps = {
      ...defaultProps,
      subtotal: 0,
      taxes: 0,
      finalTotal: 0
    };
    render(<CartSummary {...zeroProps} />);

    const subtotalRow = screen.getByText('Subtotal').closest('div');
    const taxRow = screen.getByText('Estimated tax').closest('div');
    const totalRow = screen.getByText('Total').closest('div');

    expect(within(subtotalRow).getByText('$0.00')).toBeInTheDocument();
    expect(within(taxRow).getByText('$0.00')).toBeInTheDocument();
    expect(within(totalRow).getByText('$0.00')).toBeInTheDocument();
  });

  it('renders payment method icons', () => {
    render(<CartSummary {...defaultProps} />);
    const paymentIcons = screen.getAllByRole('img');
    expect(paymentIcons).toHaveLength(3);
    expect(screen.getByAltText('Visa')).toBeInTheDocument();
    expect(screen.getByAltText('Mastercard')).toBeInTheDocument();
    expect(screen.getByAltText('PayPal')).toBeInTheDocument();
  });

  it('maintains accessible structure', () => {
    render(<CartSummary {...defaultProps} />);
    expect(screen.getByText('Order Summary').tagName).toBe('SPAN');
    expect(screen.getByText('Secure Checkout').tagName).toBe('H6');
  });
});
