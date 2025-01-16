import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, CardHeader } from '@mui/material';
import { OutlinedButton } from '../buttons/OutlinedButton';


const CartHeader = ({ itemCount, onClearCart }) => (
  <CardHeader
    title={
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Shopping Cart ({itemCount} items)</Typography>
        <OutlinedButton size="small" onClick={onClearCart}>
          Clear Cart
        </OutlinedButton>
      </Box>
    }
  />
);

CartHeader.propTypes = {
  itemCount: PropTypes.number.isRequired,
  onClearCart: PropTypes.func.isRequired
};

export { CartHeader };
