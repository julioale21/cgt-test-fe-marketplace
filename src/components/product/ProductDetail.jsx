import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, IconButton, Stack, Paper } from '@mui/material';
import { ShoppingCart, Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { ProductHeader } from './ProductHeader';
import { ProductSpecs } from './ProductSpecs';

const ProductDetails = ({ product, isInCart, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const MAX_QUANTITY = 50;

  const handleIncrement = () => {
    if (quantity < MAX_QUANTITY) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <ProductHeader name={product.name} rating={product.rating} category={product.category} />

      <Typography
        variant="h4"
        sx={{
          fontWeight: 500,
          color: 'text.primary',
          my: 3
        }}
      >
        ${product.price.toFixed(2)}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
          mb: 4
        }}
      >
        {product.description}
      </Typography>

      <Box sx={{ mb: 4 }}>
        <ProductSpecs
          format={product.format}
          polygons={product.polygons}
          textures={product.textures}
        />
      </Box>

      <Stack spacing={2}>
        {/* Quantity selector */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Cantidad:
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <IconButton
              onClick={handleDecrement}
              disabled={quantity <= 1}
              size="small"
              sx={{ color: 'text.secondary' }}
            >
              <RemoveIcon />
            </IconButton>

            <Typography
              sx={{
                minWidth: '32px',
                textAlign: 'center',
                userSelect: 'none'
              }}
            >
              {quantity}
            </Typography>

            <IconButton
              onClick={handleIncrement}
              disabled={quantity >= MAX_QUANTITY}
              size="small"
              sx={{ color: 'text.secondary' }}
            >
              <AddIcon />
            </IconButton>
          </Paper>

          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Máximo {MAX_QUANTITY} unidades
          </Typography>
        </Box>

        <Button
          variant={isInCart ? 'outlined' : 'contained'}
          size="large"
          startIcon={<ShoppingCart />}
          onClick={() => onAddToCart(quantity)}
          sx={{
            py: 1.5,
            borderRadius: 1,
            textTransform: 'none',
            fontSize: '1rem',
            boxShadow: isInCart ? 'none' : 3,
            '&:hover': {
              boxShadow: isInCart ? 'none' : 4
            }
          }}
          fullWidth
          color={isInCart ? 'secondary' : 'primary'}
        >
          {isInCart ? 'Already in Cart' : 'Add to Cart'}
        </Button>
      </Stack>
    </Box>
  );
};

ProductDetails.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    format: PropTypes.arrayOf(PropTypes.string).isRequired,
    polygons: PropTypes.string.isRequired,
    textures: PropTypes.string.isRequired
  }).isRequired,
  isInCart: PropTypes.bool.isRequired,
  onAddToCart: PropTypes.func.isRequired
};

export { ProductDetails };
