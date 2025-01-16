import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomAlert } from '../../../components/shared/CustomAlert';

describe('CustomAlert', () => {
  const defaultProps = {
    open: true,
    message: 'Test message',
    onClose: jest.fn()
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const props = { ...defaultProps };

    const { container } = render(<CustomAlert {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should render with default props', () => {
    const props = { ...defaultProps };

    render(<CustomAlert {...props} />);

    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('should render with custom severity', () => {
    const props = { ...defaultProps, severity: 'error' };

    render(<CustomAlert {...props} />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('MuiAlert-filledError');
  });

  it('should call onClose when auto-hiding', async () => {
    const props = { ...defaultProps };

    render(<CustomAlert {...props} />);
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(props.onClose).toHaveBeenCalled();
    });
  });

  it('should respect custom autoHideDuration', async () => {
    const props = { ...defaultProps, autoHideDuration: 5000 };

    render(<CustomAlert {...props} />);
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(props.onClose).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(props.onClose).toHaveBeenCalled();
    });
  });

  it('should call onClose when close button is clicked', async () => {
    jest.useRealTimers();
    const props = { ...defaultProps };
    const user = userEvent.setup({ delay: null });

    render(<CustomAlert {...props} />);
    await user.click(screen.getByRole('button', { name: /close/i }));

    expect(props.onClose).toHaveBeenCalled();
  });

  it('should not render when open is false', () => {
    const props = { ...defaultProps, open: false };

    render(<CustomAlert {...props} />);

    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });
});
