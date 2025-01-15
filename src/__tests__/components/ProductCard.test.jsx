// ProductCard.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard';

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

const renderProductCard = (props = {}) => {
  return render(
    <BrowserRouter>
      <ProductCard product={mockProduct} {...props} />
    </BrowserRouter>
  );
};

describe('ProductCard', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot when no product is provided', () => {
    const { container } = render(<ProductCard product={null} />);
    expect(container).toMatchSnapshot();
  });

  it('renders product information correctly', () => {
    renderProductCard();

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(`Rating: ${mockProduct.rating}/5`)).toBeInTheDocument();
    expect(screen.getByText(`Polygons: ${mockProduct.polygons}`)).toBeInTheDocument();
    expect(screen.getByText(`Textures: ${mockProduct.textures}`)).toBeInTheDocument();
    expect(screen.getByText(`Formats: ${mockProduct.format.join(', ')}`)).toBeInTheDocument();
  });

  it('renders product image with correct attributes', () => {
    renderProductCard();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProduct.image);
    expect(image).toHaveAttribute('alt', mockProduct.name);
  });

  it('renders action buttons', () => {
    renderProductCard();

    expect(screen.getByText('View Details')).toBeInTheDocument();
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('has correct link to product details', () => {
    renderProductCard();

    const detailsLink = screen.getByText('View Details').closest('a');
    expect(detailsLink).toHaveAttribute('href', `/products/${mockProduct.id}`);
  });

  it('returns null when no product is provided', () => {
    const { container } = render(<ProductCard product={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
