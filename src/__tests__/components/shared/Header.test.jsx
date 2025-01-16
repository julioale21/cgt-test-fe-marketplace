import { render, screen } from '@testing-library/react';
import { Header } from '../../../components/shared/Header';

describe('Header', () => {
  const renderHeader = (props = {}) => {
    return render(<Header {...props} />);
  };

  it('should match snapshot with default props', () => {
    const props = {};

    const { container } = renderHeader(props);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with cart items', () => {
    const props = { cartItemsCount: 5 };

    const { container } = renderHeader(props);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with max cart items', () => {
    const props = { cartItemsCount: 100 };

    const { container } = renderHeader(props);

    expect(container).toMatchSnapshot();
  });

  it('should render marketplace title with home link', () => {
    const props = {};

    renderHeader(props);

    const title = screen.getByText('Marketplace');
    expect(title).toBeInTheDocument();
    expect(title.tagName.toLowerCase()).toBe('a');
    expect(title).toHaveAttribute('href', '/');
  });

  it('should render navigation links', () => {
    const props = {};

    renderHeader(props);

    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should display cart with correct item count', () => {
    const props = { cartItemsCount: 5 };

    renderHeader(props);

    const badge = screen.getByText('5');
    expect(badge).toBeInTheDocument();
    expect(badge.closest('a')).toHaveAttribute('href', '/cart');
  });

  it('should display 99+ when cart items exceed 99', () => {
    const props = { cartItemsCount: 100 };

    renderHeader(props);

    const badge = screen.getByText('99+');
    expect(badge).toBeInTheDocument();
    expect(badge.closest('a')).toHaveAttribute('href', '/cart');
  });
});
