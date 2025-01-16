import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';

const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => (
  <Paper elevation={1} sx={{ p: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box
        component="img"
        src={item.image}
        alt={item.name}
        sx={{
          width: 80,
          height: 80,
          objectFit: 'cover',
          borderRadius: 1
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1">{item.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          ${item.price.toFixed(2)}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton size="small" onClick={onDecrement}>
          <RemoveIcon />
        </IconButton>
        <Typography sx={{ minWidth: 32, textAlign: 'center' }}>{item.quantity}</Typography>
        <IconButton size="small" onClick={onIncrement}>
          <AddIcon />
        </IconButton>
        <IconButton size="small" color="error" onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  </Paper>
);

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
  }).isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export { CartItem };
