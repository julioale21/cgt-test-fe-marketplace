import { renderHook, act } from '@testing-library/react';
import { useAlert } from '../../hooks/useAlert';

describe('useAlert', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useAlert());

    expect(result.current.alert).toEqual({
      open: false,
      message: '',
      severity: 'success'
    });
    expect(typeof result.current.showAlert).toBe('function');
    expect(typeof result.current.hideAlert).toBe('function');
  });

  it('should show alert with default severity', () => {
    const { result } = renderHook(() => useAlert());

    act(() => {
      result.current.showAlert('Test message');
    });

    expect(result.current.alert).toEqual({
      open: true,
      message: 'Test message',
      severity: 'success'
    });
  });

  it('should show alert with custom severity', () => {
    const { result } = renderHook(() => useAlert());

    act(() => {
      result.current.showAlert('Error message', 'error');
    });

    expect(result.current.alert).toEqual({
      open: true,
      message: 'Error message',
      severity: 'error'
    });
  });

  it('should hide alert', () => {
    const { result } = renderHook(() => useAlert());

    act(() => {
      result.current.showAlert('Test message');
    });

    act(() => {
      result.current.hideAlert({}, 'timeout');
    });

    expect(result.current.alert.open).toBe(false);
    expect(result.current.alert.message).toBe('Test message');
  });

  it('should not hide alert on clickaway', () => {
    const { result } = renderHook(() => useAlert());

    act(() => {
      result.current.showAlert('Test message');
    });

    act(() => {
      result.current.hideAlert({}, 'clickaway');
    });

    expect(result.current.alert.open).toBe(true);
  });

  it('should preserve message and severity when hiding alert', () => {
    const { result } = renderHook(() => useAlert());

    act(() => {
      result.current.showAlert('Important message', 'warning');
    });

    act(() => {
      result.current.hideAlert({}, 'timeout');
    });

    expect(result.current.alert).toEqual({
      open: false,
      message: 'Important message',
      severity: 'warning'
    });
  });

  it('should maintain function references between renders', () => {
    const { result, rerender } = renderHook(() => useAlert());
    
    const initialShowAlert = result.current.showAlert;
    const initialHideAlert = result.current.hideAlert;

    rerender();

    expect(result.current.showAlert).toBe(initialShowAlert);
    expect(result.current.hideAlert).toBe(initialHideAlert);
  });
});