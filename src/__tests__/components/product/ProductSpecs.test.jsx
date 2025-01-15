import { render, screen } from '@testing-library/react';
import { ProductSpecs } from '../../../components';

describe('ProductSpecs', () => {
  const mockProps = {
    format: ['FBX', 'OBJ', 'MAX'],
    polygons: '24k',
    textures: '4K PBR'
  };

  it('matches snapshot', () => {
    const { container } = render(<ProductSpecs {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders all specification labels', () => {
    render(<ProductSpecs {...mockProps} />);

    expect(screen.getByText('Available Formats')).toBeInTheDocument();
    expect(screen.getByText('Polygons')).toBeInTheDocument();
    expect(screen.getByText('Textures')).toBeInTheDocument();
  });

  it('displays formats as comma-separated list', () => {
    render(<ProductSpecs {...mockProps} />);
    expect(screen.getByText(mockProps.format.join(', '))).toBeInTheDocument();
  });

  it('shows correct polygons value', () => {
    render(<ProductSpecs {...mockProps} />);
    expect(screen.getByText(mockProps.polygons)).toBeInTheDocument();
  });

  it('displays textures information', () => {
    render(<ProductSpecs {...mockProps} />);
    expect(screen.getByText(mockProps.textures)).toBeInTheDocument();
  });

  it('renders dividers between specs', () => {
    const { container } = render(<ProductSpecs {...mockProps} />);
    const dividers = container.querySelectorAll('.MuiDivider-root');
    expect(dividers).toHaveLength(2);
  });

  it('throws error when required props are missing', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<ProductSpecs />);

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
