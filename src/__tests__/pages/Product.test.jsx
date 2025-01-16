import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { products } from '../../constants/products';
import Product from '../../pages/Product';
import { CartProvider } from '../../context/cart/cartProvider';

describe('Product', () => {
  const renderWithRouter = (productId = '1') => {
    return render(
      <CartProvider>
        <MemoryRouter initialEntries={[`/product/${productId}`]}>
          <Routes>
            <Route path="/product/:productId" element={<Product />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );
  };

  const testProduct = products[0];

  it('should match snapshot with valid product', () => {
    const productId = '1';

    const { container } = renderWithRouter(productId);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with invalid product', () => {
    const productId = '999';

    const { container } = renderWithRouter(productId);

    expect(container).toMatchSnapshot();
  });

  it('should render complete product information', () => {
    const productId = '1';

    renderWithRouter(productId);

    expect(screen.getByText(testProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${testProduct.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(testProduct.description)).toBeInTheDocument();
    expect(screen.getByText(testProduct.category)).toBeInTheDocument();
    expect(screen.getByText(testProduct.format.join(', '))).toBeInTheDocument();
    expect(screen.getByText(testProduct.polygons)).toBeInTheDocument();
    expect(screen.getByText(testProduct.textures)).toBeInTheDocument();
  });

  it('should render product image with correct attributes', () => {
    const productId = '1';

    renderWithRouter(productId);

    const images = screen.getAllByRole('img');
    const productImage = images.find((img) => img.alt === testProduct.name);
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute('src', testProduct.image);
    expect(productImage).toHaveAttribute('alt', testProduct.name);
  });

  it('should show not found message for invalid product id', () => {
    const productId = '999';

    renderWithRouter(productId);

    expect(screen.getByText(/Product not found/i)).toBeInTheDocument();
  });

  it('should show success message when product is added to cart', () => {
    const productId = '1';

    renderWithRouter(productId);
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);

    expect(screen.getByText(`${testProduct.name} added to cart!`)).toBeInTheDocument();
  });
});
