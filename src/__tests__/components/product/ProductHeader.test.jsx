import { render, screen } from '@testing-library/react';
import { ProductHeader } from '../../../components';

describe('ProductHeader', () => {
  const mockProps = {
    name: 'Test Product',
    rating: 4.5,
    category: 'Test Category'
  };

  it('matches snapshot', () => {
    const { container } = render(<ProductHeader {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders product name as heading', () => {
    render(<ProductHeader {...mockProps} />);
    const heading = screen.getByText(mockProps.name);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H4');
  });

  it('displays correct rating value', () => {
    render(<ProductHeader {...mockProps} />);
    expect(screen.getByText(`(${mockProps.rating})`)).toBeInTheDocument();
  });

  it('shows category in a chip', () => {
    render(<ProductHeader {...mockProps} />);
    expect(screen.getByText(mockProps.category)).toBeInTheDocument();
  });

  it('renders rating component', () => {
    const { container } = render(<ProductHeader {...mockProps} />);
    expect(container.querySelector('.MuiRating-root')).toBeInTheDocument();
  });

  it('throws error when required props are missing', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<ProductHeader />);

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
