import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  it('should render product details correctly', () => {
    const productId = '1';

    renderWithRouter(productId);

    // Verificar que los datos básicos del producto están presentes
    expect(screen.getByText(testProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${testProduct.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(testProduct.description)).toBeInTheDocument();
  });

  it('should show not found message for invalid product id', () => {
    const productId = '999';

    renderWithRouter(productId);

    expect(screen.getByText(/Product not found/i)).toBeInTheDocument();
  });

  it('should show success message when product is added to cart', async () => {
    const productId = '1';

    renderWithRouter(productId);

    await act(async () => {
      const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
      fireEvent.click(addToCartButton);
    });

    const message = await screen.findByText(/added to cart/i);
    expect(message).toBeInTheDocument();
  });
});
