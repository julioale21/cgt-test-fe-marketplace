import { render, screen } from '@testing-library/react';
import { ProductHeader } from '../../../components';

describe('ProductHeader', () => {
  const mockProps = {
    name: 'Test Product',
    rating: 4.5,
    category: 'Test Category'
  };

  it('should match snapshot', () => {
    const props = { ...mockProps };

    const { container } = render(<ProductHeader {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should render product name as h4 heading', () => {
    const props = { ...mockProps };

    render(<ProductHeader {...props} />);

    const heading = screen.getByText(props.name);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H4');
  });

  it('should display correct rating value', () => {
    const props = { ...mockProps };

    render(<ProductHeader {...props} />);

    expect(screen.getByText(`(${props.rating})`)).toBeInTheDocument();
  });

  it('should show category in a chip component', () => {
    const props = { ...mockProps };

    render(<ProductHeader {...props} />);

    expect(screen.getByText(props.category)).toBeInTheDocument();
  });

  it('should render rating component', () => {
    const props = { ...mockProps };

    const { container } = render(<ProductHeader {...props} />);

    expect(container.querySelector('.MuiRating-root')).toBeInTheDocument();
  });

  it('should throw error when required props are missing', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<ProductHeader />);

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
