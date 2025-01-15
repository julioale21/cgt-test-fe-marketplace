// src/components/shared/Header/Header.test.jsx
import { render, screen } from '@testing-library/react';
import { Header } from '../../../components/shared/Header';

describe('Header', () => {
  const renderHeader = (props = {}) => {
    return render(<Header {...props} />);
  };

  it('renders marketplace title', () => {
    renderHeader();
    const title = screen.getByText('Marketplace');
    expect(title).toBeInTheDocument();
    expect(title.tagName.toLowerCase()).toBe('a');
    expect(title).toHaveAttribute('href', '/');
  });

  it('renders navigation links', () => {
    renderHeader();
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('displays cart with correct item count', () => {
    renderHeader({ cartItemsCount: 5 });
    const badge = screen.getByText('5');
    expect(badge).toBeInTheDocument();
    expect(badge.closest('a')).toHaveAttribute('href', '/cart');
  });


  it('displays 99+ when cart items exceed 99', () => {
    renderHeader({ cartItemsCount: 100 });
    const badge = screen.getByText('99+');
    expect(badge).toBeInTheDocument();
    expect(badge.closest('a')).toHaveAttribute('href', '/cart');
  });
});