import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home';
import { CartProvider } from '../../context/cart/cartProvider';

const renderHome = () => {
  return render(
    <CartProvider>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </CartProvider>
  );
};

describe('Home', () => {
  it('should match snapshot', () => {
    const { container } = renderHome();

    expect(container).toMatchSnapshot();
  });

  it('should render main title correctly', () => {
    renderHome();

    const mainTitle = screen.getByText('3D Marketplace');
    expect(mainTitle).toBeInTheDocument();
    expect(mainTitle.tagName).toBe('H1');
  });

  it('should render product list component', () => {
    const { container } = renderHome();

    const productListContainer = container.querySelector('.MuiContainer-root');
    expect(productListContainer).toBeInTheDocument();
  });

  it('should render container with correct styles', () => {
    const { container } = renderHome();

    const mainContainer = container.querySelector('.MuiContainer-root');
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveStyle({
      maxWidth: '1400px'
    });
  });

  it('should apply responsive padding', () => {
    const { container } = renderHome();

    const mainContainer = container.querySelector('.MuiContainer-root');
    expect(mainContainer).toHaveStyle({
      marginLeft: 'auto',
      marginRight: 'auto'
    });
  });

  it('should render title with responsive font size', () => {
    renderHome();

    const mainTitle = screen.getByText('3D Marketplace');
    expect(mainTitle).toHaveStyle({
      marginTop: '32px',
      marginBottom: '32px'
    });
  });
});
