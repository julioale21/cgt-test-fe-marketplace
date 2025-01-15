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

  it('matches snapshot with valid product', () => {
    const { container } = renderWithRouter('1');
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with invalid product', () => {
    const { container } = renderWithRouter('999');
    expect(container).toMatchSnapshot();
  });

  it('renders complete product information', () => {
    renderWithRouter('1');

    expect(screen.getByText(testProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${testProduct.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(testProduct.description)).toBeInTheDocument();
    expect(screen.getByText(testProduct.category)).toBeInTheDocument();
    expect(screen.getByText(testProduct.format.join(', '))).toBeInTheDocument();
    expect(screen.getByText(testProduct.polygons)).toBeInTheDocument();
    expect(screen.getByText(testProduct.textures)).toBeInTheDocument();
  });

  it('renders product image correctly', () => {
    renderWithRouter('1');
    const images = screen.getAllByRole('img');
    const productImage = images.find((img) => img.alt === testProduct.name);

    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute('src', testProduct.image);
    expect(productImage).toHaveAttribute('alt', testProduct.name);
  });

  it('shows not found message for invalid product id', () => {
    renderWithRouter('999');
    expect(screen.getByText(/Product not found/i)).toBeInTheDocument();
  });

  it('shows add to cart button and handles click', () => {
    renderWithRouter('1');

    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);

    expect(screen.getByText(`${testProduct.name} added to cart!`)).toBeInTheDocument();
  });
});
