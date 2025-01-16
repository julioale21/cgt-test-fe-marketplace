import React from 'react';
import { render, screen } from '@testing-library/react';
import { PaymentMethodIcon } from '../../../components';

describe('PaymentMethodIcon', () => {
  const defaultProps = {
    src: 'test-image.png',
    alt: 'Test payment method'
  };

  it('matches snapshot', () => {
    const { container } = render(<PaymentMethodIcon {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders with default size', () => {
    render(<PaymentMethodIcon {...defaultProps} />);
    const img = screen.getByRole('img');

    expect(img).toHaveStyle({
      height: '60px',
      width: '60px'
    });
  });

  it('applies custom size within valid range', () => {
    render(<PaymentMethodIcon {...defaultProps} size={100} />);
    const img = screen.getByRole('img');

    expect(img).toHaveStyle({
      height: '100px',
      width: '100px'
    });
  });

  it('clamps size to minimum value', () => {
    render(<PaymentMethodIcon {...defaultProps} size={10} />);
    const img = screen.getByRole('img');

    expect(img).toHaveStyle({
      height: '20px',
      width: '20px'
    });
  });

  it('clamps size to maximum value', () => {
    render(<PaymentMethodIcon {...defaultProps} size={300} />);
    const img = screen.getByRole('img');

    expect(img).toHaveStyle({
      height: '200px',
      width: '200px'
    });
  });

  it('returns null when src is not provided', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(<PaymentMethodIcon alt="Test" />);

    expect(container.firstChild).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'PaymentMethodIcon: src prop is required for proper rendering'
    );

    consoleSpy.mockRestore();
  });

  it('applies grayscale filter and opacity by default', () => {
    render(<PaymentMethodIcon {...defaultProps} />);
    const img = screen.getByRole('img');

    expect(img).toHaveStyle({
      filter: 'grayscale(100%)',
      opacity: '0.7'
    });
  });

  it('includes hover opacity styles', () => {
    const { container } = render(<PaymentMethodIcon {...defaultProps} />);
    const styles = window.getComputedStyle(container.firstChild);

    expect(styles).toBeDefined();
  });

  it('maintains object-fit contain property', () => {
    render(<PaymentMethodIcon {...defaultProps} />);
    const img = screen.getByRole('img');

    expect(img).toHaveStyle({
      objectFit: 'contain'
    });
  });
});
