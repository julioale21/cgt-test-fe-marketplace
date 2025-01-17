import React from 'react';
import { render, screen } from '@testing-library/react';
import { OrderSummary } from '../../components';


const mockItems = [
  {
    id: 1,
    name: 'Test Product 1',
    price: 29.99,
    quantity: 2,
    image: 'test-image-1.jpg'
  },
  {
    id: 2,
    name: 'Test Product 2',
    price: 39.99,
    quantity: 1,
    image: 'test-image-2.jpg'
  },
  {
    id: 3,
    name: 'Test Product 3',
    price: 49.99,
    quantity: 1,
    image: 'test-image-3.jpg'
  }
];

const defaultProps = {
  items: mockItems,
  subtotal: 149.96,
  shipping: 0,
  taxes: 12.5,
  finalTotal: 162.46
};

describe('OrderSummary', () => {
  it('should match snapshot', () => {
    const { container } = render(<OrderSummary {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should display order summary title', () => {
    render(<OrderSummary {...defaultProps} />);

    expect(screen.getByText('Order Summary')).toBeInTheDocument();
  });

  it('should display only first two items from the list', () => {
    render(<OrderSummary {...defaultProps} />);

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.queryByText('Test Product 3')).not.toBeInTheDocument();
  });

  it('should show remaining items count when more than 2 items exist', () => {
    render(<OrderSummary {...defaultProps} />);

    expect(screen.getByText('And 1 more items...')).toBeInTheDocument();
  });

  it('should not show remaining items count when 2 or fewer items exist', () => {
    render(<OrderSummary {...{ ...defaultProps, items: mockItems.slice(0, 2) }} />);

    expect(screen.queryByText(/more items/)).not.toBeInTheDocument();
  });

  it('should display correct item quantities', () => {
    render(<OrderSummary {...defaultProps} />);

    expect(screen.getByText('Qty: 2')).toBeInTheDocument();
    expect(screen.getByText('Qty: 1')).toBeInTheDocument();
  });

  it('should display correct price calculations', () => {
    render(<OrderSummary {...defaultProps} />);

    expect(screen.getByText('$59.98')).toBeInTheDocument();
    expect(screen.getByText('$39.99')).toBeInTheDocument();
  });

  it('should display correct order totals', () => {
    render(<OrderSummary {...defaultProps} />);

    expect(screen.getByText('$149.96')).toBeInTheDocument();
    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.getByText('$12.50')).toBeInTheDocument();
    expect(screen.getByText('$162.46')).toBeInTheDocument();
  });

  it('should display shipping information', () => {
    render(<OrderSummary {...defaultProps} />);

    expect(screen.getByText('Free Shipping')).toBeInTheDocument();
    expect(screen.getByText('Estimated delivery: 3-5 business days')).toBeInTheDocument();
  });
});
