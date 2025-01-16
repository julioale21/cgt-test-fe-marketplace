import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProductCard } from '../../../components';
import { CartProvider } from '../../../context/cart/cartProvider';

const mockProduct = {
  id: 1,
  name: '3D Modern Chair',
  price: 149.99,
  description: 'High-quality 3D model of a modern minimalist chair',
  image: '/path/to/image.jpg',
  category: 'Furniture',
  rating: 4.5,
  format: ['FBX', 'OBJ', 'MAX'],
  polygons: '24k',
  textures: '4K PBR'
};

const renderWithProviders = (component) => {
  return render(
    <CartProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </CartProvider>
  );
};

describe('ProductCard', () => {
  it('should match snapshot', () => {
    const props = { product: mockProduct };

    const { container } = renderWithProviders(<ProductCard {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when no product is provided', () => {
    const props = { product: null };

    const { container } = renderWithProviders(<ProductCard {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should render all product information correctly', () => {
    const props = { product: mockProduct };

    renderWithProviders(<ProductCard {...props} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(`Rating: ${mockProduct.rating}/5`)).toBeInTheDocument();
    expect(screen.getByText(`Polygons: ${mockProduct.polygons}`)).toBeInTheDocument();
    expect(screen.getByText(`Textures: ${mockProduct.textures}`)).toBeInTheDocument();
    expect(screen.getByText(`Formats: ${mockProduct.format.join(', ')}`)).toBeInTheDocument();
  });

  it('should render product image with correct attributes', () => {
    const props = { product: mockProduct };

    renderWithProviders(<ProductCard {...props} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProduct.image);
    expect(image).toHaveAttribute('alt', mockProduct.name);
  });

  it('should render action buttons', () => {
    const props = { product: mockProduct };

    renderWithProviders(<ProductCard {...props} />);

    expect(screen.getByText('View Details')).toBeInTheDocument();
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('should have correct link to product details', () => {
    const props = { product: mockProduct };

    renderWithProviders(<ProductCard {...props} />);

    const detailsLink = screen.getByText('View Details').closest('a');
    expect(detailsLink).toHaveAttribute('href', `/products/${mockProduct.id}`);
  });

  it('should return null when no product is provided', () => {
    const props = { product: null };

    const { container } = renderWithProviders(<ProductCard {...props} />);

    expect(container).toBeEmptyDOMElement();
  });
});
