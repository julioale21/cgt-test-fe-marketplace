import React, { useState } from 'react';
import { Container, Grid, Typography, Box, Button, Snackbar, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';
import { products } from '../constants/products';
import { ProductHeader, ProductImage, ProductSpecs } from '../components';
import { useCart } from '../hooks/useCart';

const Product = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" align="center">
          Product not found
        </Typography>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ProductImage image={product.image} name={product.name} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <ProductHeader
              name={product.name}
              rating={product.rating}
              category={product.category}
            />

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
              variant="contained"
              size="large"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              sx={{ mt: 4 }}
              fullWidth
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {product.name} added to cart!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Product;
