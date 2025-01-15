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

  it('renders with default props', () => {
    render(<CustomAlert {...defaultProps} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders with custom severity', () => {
    render(<CustomAlert {...defaultProps} severity="error" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('MuiAlert-filledError');
  });

  it('calls onClose when auto-hiding', async () => {
    render(<CustomAlert {...defaultProps} />);
    
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });

  it('respects custom autoHideDuration', async () => {
    render(<CustomAlert {...defaultProps} autoHideDuration={5000} />);
    
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    
    expect(defaultProps.onClose).not.toHaveBeenCalled();
    
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });

  it('calls onClose when close button is clicked', async () => {
    jest.useRealTimers(); // Switch to real timers for userEvent
    const user = userEvent.setup({ delay: null }); // Disable delay for faster tests
    
    render(<CustomAlert {...defaultProps} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    
    await user.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('does not render when open is false', () => {
    render(<CustomAlert {...defaultProps} open={false} />);
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });
});