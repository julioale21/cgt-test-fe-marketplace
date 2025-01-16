import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home';

const renderHome = () => {
  return render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
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

  it('should render container with correct max width and padding', () => {
    const { container } = renderHome();

    const mainContainer = container.querySelector('.MuiContainer-root');
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass('MuiContainer-maxWidthLg');
  });
});
