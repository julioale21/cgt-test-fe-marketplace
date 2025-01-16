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

  it('should handle floating point values correctly', () => {
    const props = {
      ...defaultProps,
      subtotal: 99.999,
      taxes: 8.999,
      finalTotal: 108.999
    };

    render(<CartSummary {...props} />);

    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('$9.00')).toBeInTheDocument();
    expect(screen.getByText('$109.00')).toBeInTheDocument();
  });

  it('should handle very large numbers', () => {
    const props = {
      ...defaultProps,
      subtotal: 999999.99,
      taxes: 99999.99,
      finalTotal: 1099999.98
    };

    render(<CartSummary {...props} />);

    const subtotalRow = screen.getByText('Subtotal').closest('div');
    const taxRow = screen.getByText('Estimated tax').closest('div');
    const totalRow = screen.getByText('Total').closest('div');

    expect(within(subtotalRow).getByText('$999,999.99')).toBeInTheDocument();
    expect(within(taxRow).getByText('$99,999.99')).toBeInTheDocument();
    expect(within(totalRow).getByText('$1,099,999.98')).toBeInTheDocument();
  });

  it('should handle non-positive values as zero', () => {
    const props = {
      ...defaultProps,
      subtotal: -99.99,
      taxes: -8.99,
      finalTotal: -108.98
    };

    render(<CartSummary {...props} />);

    const subtotalRow = screen.getByText('Subtotal').closest('div');
    const taxRow = screen.getByText('Estimated tax').closest('div');
    const totalRow = screen.getByText('Total').closest('div');

    expect(within(subtotalRow).getByText('$0.00')).toBeInTheDocument();
    expect(within(taxRow).getByText('$0.00')).toBeInTheDocument();
    expect(within(totalRow).getByText('$0.00')).toBeInTheDocument();
  });

  it('should call onCheckout when checkout button is clicked', async () => {
    const props = { ...defaultProps };
    const user = userEvent.setup();

    render(<CartSummary {...props} />);
    await user.click(screen.getByText('Continue to Checkout'));

    expect(props.onCheckout).toHaveBeenCalledTimes(1);
  });

  it('should handle undefined callback props', async () => {
    const props = {
      ...defaultProps,
      onCheckout: undefined,
      onContinueShopping: undefined
    };
    const user = userEvent.setup();

    render(<CartSummary {...props} />);

    await user.click(screen.getByText('Continue to Checkout'));
    await user.click(screen.getByText('Continue Shopping'));

    expect(screen.getByText('Continue to Checkout')).toBeInTheDocument();
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

  it('should render all payment method icons with correct attributes', () => {
    const props = { ...defaultProps };

    render(<CartSummary {...props} />);

    const paymentIcons = screen.getAllByRole('img');
    expect(paymentIcons).toHaveLength(3);
    paymentIcons.forEach((icon) => {
      expect(icon).toHaveAttribute('src');
      expect(icon).toHaveAttribute('alt');
    });
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
