import { render } from '@testing-library/react';
import { ProductImage } from '../../../components';

describe('ProductImage', () => {
  const mockProps = {
    image: 'test-image.jpg',
    name: 'Test Product'
  };

  it('should match snapshot', () => {
    const props = { ...mockProps };

    const { container } = render(<ProductImage {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should render the image with correct src and alt attributes', () => {
    const props = { ...mockProps };

    const { getByRole } = render(<ProductImage {...props} />);
    const image = getByRole('img');

    expect(image).toHaveAttribute('src', props.image);
    expect(image).toHaveAttribute('alt', props.name);
  });

  it('should render within a Card component', () => {
    const props = { ...mockProps };

    const { container } = render(<ProductImage {...props} />);

    expect(container.firstChild).toHaveClass('MuiCard-root');
  });

  it('should throw error when required props are missing', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<ProductImage />);

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
