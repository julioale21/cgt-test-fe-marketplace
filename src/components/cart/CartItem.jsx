import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, IconButton } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';

const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => (
  <Box
    sx={{
      py: 3,
      display: 'flex',
      gap: 3
    }}
  >
    <Box
      component="img"
      src={item.image}
      alt={item.name}
      sx={{
        width: '80px',
        height: '80px',
        objectFit: 'cover',
        borderRadius: 2
      }}
    />

    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            {item.name}
          </Typography>
          <Typography variant="h5" sx={{ mt: 1, fontWeight: 500 }}>
            ${item.price.toFixed(2)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <IconButton
            onClick={onDecrement}
            size="small"
            sx={{
              color: 'action.active',
              '&:hover': {
                color: 'primary.main',
                bgcolor: 'primary.lighter'
              }
            }}
          >
            <RemoveIcon />
          </IconButton>
          <Typography
            sx={{
              minWidth: '32px',
              textAlign: 'center'
            }}
          >
            {item.quantity}
          </Typography>
          <IconButton
            onClick={onIncrement}
            size="small"
            sx={{
              color: 'action.active',
              '&:hover': {
                color: 'primary.main',
                bgcolor: 'primary.lighter'
              }
            }}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            onClick={onRemove}
            size="small"
            color="error"
            sx={{
              ml: 2,
              '&:hover': {
                bgcolor: 'error.lighter'
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  </Box>
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
