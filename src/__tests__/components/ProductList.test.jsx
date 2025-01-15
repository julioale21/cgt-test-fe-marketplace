import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProductList } from '../../components/ProductList';
import { products } from '../../constants/products';

const renderProductList = (props = {}) => {
  return render(
    <BrowserRouter>
      <ProductList products={products} {...props} />
    </BrowserRouter>
  );
};

describe('ProductList', () => {
  it('matches snapshot with products', () => {
    const { container } = render(
      <BrowserRouter>
        <ProductList products={products} />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with empty products', () => {
    const { container } = render(
      <BrowserRouter>
        <ProductList products={[]} />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
  it('renders all products', () => {
    renderProductList();

    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument();
    });
  });

  it('renders correct number of ProductCard components', () => {
    renderProductList();

    const productCards = screen.getAllByRole('img');
    expect(productCards).toHaveLength(products.length);
  });

  it('returns null when products array is empty', () => {
    const { container } = render(<ProductList products={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('returns null when products is null', () => {
    const { container } = render(<ProductList products={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
