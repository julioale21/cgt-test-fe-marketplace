import { render } from '@testing-library/react';
import { ProductImage } from '../../../components';


describe('ProductImage', () => {
  const mockProps = {
    image: 'test-image.jpg',
    name: 'Test Product'
  };

  it('renders the image with correct src and alt', () => {
    const { getByRole } = render(<ProductImage {...mockProps} />);
    const image = getByRole('img');

    expect(image).toHaveAttribute('src', mockProps.image);
    expect(image).toHaveAttribute('alt', mockProps.name);
  });

  it('renders within a Card component', () => {
    const { container } = render(<ProductImage {...mockProps} />);
    expect(container.firstChild).toHaveClass('MuiCard-root');
  });

  // Test prop types validation
  it('throws error when required props are missing', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<ProductImage />);

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
