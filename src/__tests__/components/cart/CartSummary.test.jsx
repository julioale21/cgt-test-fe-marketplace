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

  it('should match snapshot', () => {
    const props = { ...defaultProps };

    const { container } = render(<CartSummary {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should render all components with correct values', () => {
    const props = { ...defaultProps };

    render(<CartSummary {...props} />);

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

  it('should display shipping cost when not free', () => {
    const props = { ...defaultProps, shipping: 5.99 };

    render(<CartSummary {...props} />);

    expect(screen.getByText('$5.99')).toBeInTheDocument();
  });

  it('should call onCheckout when checkout button is clicked', async () => {
    const props = { ...defaultProps };
    const user = userEvent.setup();

    render(<CartSummary {...props} />);
    await user.click(screen.getByText('Continue to Checkout'));

    expect(props.onCheckout).toHaveBeenCalledTimes(1);
  });

  it('should call onContinueShopping when continue shopping button is clicked', async () => {
    const props = { ...defaultProps };
    const user = userEvent.setup();

    render(<CartSummary {...props} />);
    await user.click(screen.getByText('Continue Shopping'));

    expect(props.onContinueShopping).toHaveBeenCalledTimes(1);
  });

  it('should handle zero values correctly', () => {
    const props = {
      ...defaultProps,
      subtotal: 0,
      taxes: 0,
      finalTotal: 0
    };

    render(<CartSummary {...props} />);

    const subtotalRow = screen.getByText('Subtotal').closest('div');
    const taxRow = screen.getByText('Estimated tax').closest('div');
    const totalRow = screen.getByText('Total').closest('div');
    expect(within(subtotalRow).getByText('$0.00')).toBeInTheDocument();
    expect(within(taxRow).getByText('$0.00')).toBeInTheDocument();
    expect(within(totalRow).getByText('$0.00')).toBeInTheDocument();
  });

  it('should render all payment method icons', () => {
    const props = { ...defaultProps };

    render(<CartSummary {...props} />);

    const paymentIcons = screen.getAllByRole('img');
    expect(paymentIcons).toHaveLength(3);
    expect(screen.getByAltText('Visa')).toBeInTheDocument();
    expect(screen.getByAltText('Mastercard')).toBeInTheDocument();
    expect(screen.getByAltText('PayPal')).toBeInTheDocument();
  });

  it('should maintain accessible structure with correct HTML tags', () => {
    const props = { ...defaultProps };

    render(<CartSummary {...props} />);

    expect(screen.getByText('Order Summary').tagName).toBe('SPAN');
    expect(screen.getByText('Secure Checkout').tagName).toBe('H6');
  });
});
