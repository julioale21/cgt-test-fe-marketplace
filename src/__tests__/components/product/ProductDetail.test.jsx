import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductDetails } from '../../../components';

jest.mock('../../../components/product/ProductHeader', () => ({
  ProductHeader: ({ name, rating, category }) => (
    <div data-testid="product-header">
      {name} - {rating} - {category}
    </div>
  )
}));

jest.mock('../../../components/product/ProductSpecs', () => ({
  ProductSpecs: ({ format, polygons, textures }) => (
    <div data-testid="product-specs">
      {format.join(',')} - {polygons} - {textures}
    </div>
  )
}));

describe('ProductDetails', () => {
  const mockProduct = {
    name: 'Test Product',
    rating: 4.5,
    category: 'Test Category',
    price: 99.99,
    description: 'Test description',
    format: ['FBX', 'OBJ'],
    polygons: 'High',
    textures: '4K'
  };

  const mockOnAddToCart = jest.fn();

  const renderComponent = (props = {}) => {
    const defaultProps = {
      product: mockProduct,
      isInCart: false,
      onAddToCart: mockOnAddToCart,
      ...props
    };
    return render(<ProductDetails {...defaultProps} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot when product is not in cart', () => {
    const { container } = render(
      <ProductDetails product={mockProduct} isInCart={false} onAddToCart={mockOnAddToCart} />
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when product is in cart', () => {
    const { container } = render(
      <ProductDetails product={mockProduct} isInCart={true} onAddToCart={mockOnAddToCart} />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render all product information', () => {
    renderComponent();

    expect(screen.getByTestId('product-header')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByTestId('product-specs')).toBeInTheDocument();
    expect(screen.getByText('Cantidad:')).toBeInTheDocument();
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('should increment quantity when plus button is clicked', () => {
    renderComponent();
    const incrementButton = screen.getByTestId('AddIcon').parentElement;

    fireEvent.click(incrementButton);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should decrement quantity when minus button is clicked', () => {
    renderComponent();
    const incrementButton = screen.getByTestId('AddIcon').parentElement;
    const decrementButton = screen.getByTestId('RemoveIcon').parentElement;
    fireEvent.click(incrementButton);

    fireEvent.click(decrementButton);

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should not decrement quantity below 1', () => {
    renderComponent();
    const decrementButton = screen.getByTestId('RemoveIcon').parentElement;

    fireEvent.click(decrementButton);

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should not increment quantity above 50', () => {
    renderComponent();
    const incrementButton = screen.getByTestId('AddIcon').parentElement;
    Array(51)
      .fill(null)
      .forEach(() => fireEvent.click(incrementButton));

    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('should call onAddToCart with selected quantity', () => {
    renderComponent();
    const incrementButton = screen.getByTestId('AddIcon').parentElement;
    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);

    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalledWith(3);
  });

  it('should display different button state when product is in cart', () => {
    renderComponent({ isInCart: true });

    const button = screen.getByText('Already in Cart');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('MuiButton-outlined');
  });

  it('should display maximum quantity message', () => {
    renderComponent();

    expect(screen.getByText('Máximo 50 unidades')).toBeInTheDocument();
  });

  it('should maintain quantity state between renders', () => {
    const { rerender } = renderComponent();
    const incrementButton = screen.getByTestId('AddIcon').parentElement;
    fireEvent.click(incrementButton);

    rerender(
      <ProductDetails product={mockProduct} isInCart={false} onAddToCart={mockOnAddToCart} />
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
