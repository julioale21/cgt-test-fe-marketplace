import React from 'react';
import PropTypes from 'prop-types';
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

CartSummaryRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  variant: PropTypes.oneOf([
    'body1',
    'body2',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'caption',
    'overline'
  ]),
  labelColor: PropTypes.string,
  valueColor: PropTypes.string
};

export { CartSummaryRow };
