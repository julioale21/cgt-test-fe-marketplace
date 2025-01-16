import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartHeader } from '../../../components';

describe('CartHeader', () => {
  const defaultProps = {
    itemCount: 1,
    onClearCart: jest.fn()
  };

  it('should match snapshot when displaying a single item', () => {
    const props = { ...defaultProps };

    const { container } = render(<CartHeader {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when displaying multiple items', () => {
    const props = { ...defaultProps, itemCount: 3 };

    const { container } = render(<CartHeader {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should display item count in singular form', () => {
    const props = { ...defaultProps };

    render(<CartHeader {...props} />);

    expect(screen.getByText('Shopping Cart (1 items)')).toBeInTheDocument();
  });

  it('should display item count in plural form', () => {
    const props = { ...defaultProps, itemCount: 3 };

    render(<CartHeader {...props} />);

    expect(screen.getByText('Shopping Cart (3 items)')).toBeInTheDocument();
  });

  it('should call onClearCart when clear button is clicked', async () => {
    const props = { ...defaultProps };
    const user = userEvent.setup();

    render(<CartHeader {...props} />);
    await user.click(screen.getByText('Clear Cart'));

    expect(props.onClearCart).toHaveBeenCalledTimes(1);
  });

  it('should render clear cart button with small size', () => {
    const props = { ...defaultProps };

    render(<CartHeader {...props} />);
    const button = screen.getByRole('button', { name: 'Clear Cart' });

    expect(button).toHaveClass('MuiButton-sizeSmall');
  });
});
