import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { ProductHeader } from './ProductHeader';
import { ProductSpecs } from './ProductSpecs';

const ProductDetails = ({ product, isInCart, onAddToCart }) => {
  return (
    <Box>
      <ProductHeader name={product.name} rating={product.rating} category={product.category} />

      <Typography variant="h5" color="primary" gutterBottom>
        ${product.price.toFixed(2)}
      </Typography>

      <Typography variant="body1" paragraph>
        {product.description}
      </Typography>

      <ProductSpecs
        format={product.format}
        polygons={product.polygons}
        textures={product.textures}
      />

      <Button
        variant={isInCart ? 'outlined' : 'contained'}
        size="large"
        startIcon={<ShoppingCart />}
        onClick={onAddToCart}
        sx={{ mt: 4, borderRadius: 5 }}
        fullWidth
        color={isInCart ? 'secondary' : 'primary'}
      >
        {isInCart ? 'Already in Cart' : 'Add to Cart'}
      </Button>
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
    format: PropTypes.string.isRequired,
    polygons: PropTypes.number.isRequired,
    textures: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  isInCart: PropTypes.bool.isRequired,
  onAddToCart: PropTypes.func.isRequired
};

export { ProductDetails };
