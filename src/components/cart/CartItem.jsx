import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, IconButton } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';

const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => (
  <Box
    sx={{
      py: { xs: 2, sm: 3 },
      px: { xs: 1, sm: 0 },
      display: 'flex',
      gap: { xs: 2, sm: 3 }
    }}
  >
    <Box
      component="img"
      src={item.image}
      alt={item.name}
      sx={{
        width: { xs: '60px', sm: '80px' },
        height: { xs: '60px', sm: '80px' },
        objectFit: 'cover',
        borderRadius: 2,
        flexShrink: 0
      }}
    />

    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minWidth: 0
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'center', sm: 'flex-start' },
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          gap: { xs: 1, sm: 2 }
        }}
      >
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
              fontSize: { xs: '0.9rem', sm: '1.25rem' },
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {item.name}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mt: 0.5,
              fontWeight: 500,
              fontSize: { xs: '1rem', sm: '1.5rem' }
            }}
          >
            ${item.price.toFixed(2)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 0.5, sm: 1 },
            flexShrink: 0
          }}
        >
          <IconButton
            onClick={onDecrement}
            size="small"
            sx={{
              color: 'action.active',
              padding: { xs: '4px', sm: '8px' },
              '&:hover': {
                color: 'primary.main',
                bgcolor: 'primary.lighter'
              }
            }}
          >
            <RemoveIcon sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }} />
          </IconButton>
          <Typography
            sx={{
              minWidth: { xs: '24px', sm: '32px' },
              textAlign: 'center',
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            {item.quantity}
          </Typography>
          <IconButton
            onClick={onIncrement}
            size="small"
            sx={{
              color: 'action.active',
              padding: { xs: '4px', sm: '8px' },
              '&:hover': {
                color: 'primary.main',
                bgcolor: 'primary.lighter'
              }
            }}
          >
            <AddIcon sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }} />
          </IconButton>
          <IconButton
            onClick={onRemove}
            size="small"
            color="error"
            sx={{
              ml: { xs: 1, sm: 2 },
              padding: { xs: '4px', sm: '8px' },
              '&:hover': {
                bgcolor: 'error.lighter'
              }
            }}
          >
            <DeleteIcon sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }} />
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
