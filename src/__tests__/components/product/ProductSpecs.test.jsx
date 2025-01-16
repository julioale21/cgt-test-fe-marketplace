import { render, screen } from '@testing-library/react';
import { ProductSpecs } from '../../../components';

describe('ProductSpecs', () => {
  const mockProps = {
    format: ['FBX', 'OBJ', 'MAX'],
    polygons: '24k',
    textures: '4K PBR'
  };

  it('should match snapshot', () => {
    const props = { ...mockProps };

    const { container } = render(<ProductSpecs {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should render all specification labels', () => {
    const props = { ...mockProps };

    render(<ProductSpecs {...props} />);

    expect(screen.getByText('Available Formats')).toBeInTheDocument();
    expect(screen.getByText('Polygons')).toBeInTheDocument();
    expect(screen.getByText('Textures')).toBeInTheDocument();
  });

  it('should display formats as comma-separated list', () => {
    const props = { ...mockProps };

    render(<ProductSpecs {...props} />);

    expect(screen.getByText(props.format.join(', '))).toBeInTheDocument();
  });

  it('should show correct polygons value', () => {
    const props = { ...mockProps };

    render(<ProductSpecs {...props} />);

    expect(screen.getByText(props.polygons)).toBeInTheDocument();
  });

  it('should display textures information', () => {
    const props = { ...mockProps };

    render(<ProductSpecs {...props} />);

    expect(screen.getByText(props.textures)).toBeInTheDocument();
  });

  it('should render dividers between specs', () => {
    const props = { ...mockProps };

    const { container } = render(<ProductSpecs {...props} />);

    const dividers = container.querySelectorAll('.MuiDivider-root');
    expect(dividers).toHaveLength(2);
  });

  it('should throw error when required props are missing', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<ProductSpecs />);

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
