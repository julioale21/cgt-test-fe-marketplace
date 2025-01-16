import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartHeader } from '../../../components';


describe('CartHeader', () => {
  const defaultProps = {
    itemCount: 1,
    onClearCart: jest.fn()
  };

  it('matches snapshot with single item', () => {
    const { container } = render(<CartHeader {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with multiple items', () => {
    const { container } = render(<CartHeader {...defaultProps} itemCount={3} />);
    expect(container).toMatchSnapshot();
  });

  it('displays correct item count in singular form', () => {
    render(<CartHeader {...defaultProps} />);
    expect(screen.getByText('Shopping Cart (1 items)')).toBeInTheDocument();
  });

  it('displays correct item count in plural form', () => {
    render(<CartHeader {...defaultProps} itemCount={3} />);
    expect(screen.getByText('Shopping Cart (3 items)')).toBeInTheDocument();
  });

  it('calls onClearCart when clear button is clicked', async () => {
    render(<CartHeader {...defaultProps} />);
    const user = userEvent.setup();

    await user.click(screen.getByText('Clear Cart'));
    expect(defaultProps.onClearCart).toHaveBeenCalledTimes(1);
  });

  it('renders clear cart button with correct size', () => {
    render(<CartHeader {...defaultProps} />);
    const button = screen.getByRole('button', { name: 'Clear Cart' });
    expect(button).toHaveClass('MuiButton-sizeSmall');
  });
});
