
import { useState, useCallback } from 'react';

export const useAlert = () => {
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const showAlert = useCallback((message, severity = 'success') => {
    setAlert({
      open: true,
      message,
      severity
    });
  }, []);

  const hideAlert = useCallback((event, reason) => {
    if (reason === 'clickaway') return;
    setAlert(prev => ({ ...prev, open: false }));
  }, []);

  return {
    alert,
    showAlert,
    hideAlert
  };
};