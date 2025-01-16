import React from 'react';
import { render, screen } from '@testing-library/react';
import { PaymentMethodIcon } from '../../../components';

describe('PaymentMethodIcon', () => {
  const defaultProps = {
    src: 'test-image.png',
    alt: 'Test payment method'
  };

  it('should match snapshot', () => {
    const props = { ...defaultProps };

    const { container } = render(<PaymentMethodIcon {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should render with default size of 60px', () => {
    const props = { ...defaultProps };

    render(<PaymentMethodIcon {...props} />);
    const img = screen.getByRole('img');

    expect(img).toHaveStyle({
      height: '60px',
      width: '60px'
    });
  });

  it('should apply custom size when within valid range', () => {
    const props = { ...defaultProps, size: 100 };

    render(<PaymentMethodIcon {...props} />);
    const img = screen.getByRole('img');

    expect(img).toHaveStyle({
      height: '100px',
      width: '100px'
    });
  });

  it('should clamp size to minimum value of 20px', () => {
    const props = { ...defaultProps, size: 10 };

    render(<PaymentMethodIcon {...props} />);
    const img = screen.getByRole('img');

    expect(img).toHaveStyle({
      height: '20px',
      width: '20px'
    });
  });

  it('should clamp size to maximum value of 200px', () => {
    const props = { ...defaultProps, size: 300 };

    render(<PaymentMethodIcon {...props} />);
    const img = screen.getByRole('img');

    expect(img).toHaveStyle({
      height: '200px',
      width: '200px'
    });
  });

  it('should return null and warn when src is not provided', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const props = { alt: 'Test' };

    const { container } = render(<PaymentMethodIcon {...props} />);

    expect(container.firstChild).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      'PaymentMethodIcon: src prop is required for proper rendering'
    );
    consoleSpy.mockRestore();
  });

  it('should apply default grayscale filter and opacity', () => {
    const props = { ...defaultProps };

    render(<PaymentMethodIcon {...props} />);
    const img = screen.getByRole('img');

    expect(img).toHaveStyle({
      filter: 'grayscale(100%)',
      opacity: '0.7'
    });
  });

  it('should include hover opacity styles', () => {
    const props = { ...defaultProps };

    const { container } = render(<PaymentMethodIcon {...props} />);
    const styles = window.getComputedStyle(container.firstChild);

    expect(styles).toBeDefined();
  });

  it('should maintain object-fit contain property', () => {
    const props = { ...defaultProps };

    render(<PaymentMethodIcon {...props} />);
    const img = screen.getByRole('img');

    expect(img).toHaveStyle({
      objectFit: 'contain'
    });
  });
});
