import React from 'react';
import { Box, Typography } from '@mui/material';

const CartSummaryRow = ({
  label,
  value,
  variant = 'body1',
  labelColor = 'text.secondary',
  valueColor = 'text.primary'
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography color={labelColor} variant={variant}>
        {label}
      </Typography>
      <Typography color={valueColor} variant={variant}>
        {value}
      </Typography>
    </Box>
  );
};

export { CartSummaryRow };
