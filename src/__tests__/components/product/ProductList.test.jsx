import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { products } from '../../../constants/products';
import { ProductList } from '../../../components';

const renderProductList = (props = {}) => {
  return render(
    <BrowserRouter>
      <ProductList products={products} {...props} />
    </BrowserRouter>
  );
};

describe('ProductList', () => {
  it('should match snapshot with products', () => {
    const props = { products };

    const { container } = render(
      <BrowserRouter>
        <ProductList {...props} />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with empty products array', () => {
    const props = { products: [] };

    const { container } = render(
      <BrowserRouter>
        <ProductList {...props} />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render all product information correctly', () => {
    const props = { products };

    renderProductList(props);

    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument();
    });
  });

  it('should render correct number of ProductCard components', () => {
    const props = { products };

    renderProductList(props);

    const productCards = screen.getAllByRole('img');
    expect(productCards).toHaveLength(products.length);
  });

  it('should return null when products array is empty', () => {
    const props = { products: [] };

    const { container } = render(<ProductList {...props} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('should return null when products is null', () => {
    const props = { products: null };

    const { container } = render(<ProductList {...props} />);

    expect(container).toBeEmptyDOMElement();
  });
});
