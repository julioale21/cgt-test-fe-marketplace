import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useProduct } from '../hooks/useProduct';
import { useAlert } from '../hooks/useAlert';
import { ProductImage } from '../components';
import { CustomAlert, ProductDetails } from '../components';

const Product = () => {
  const { product, isInCart, handleAddToCart } = useProduct();
  const { alert, showAlert, hideAlert } = useAlert();

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" align="center">
          Product not found
        </Typography>
      </Container>
    );
  }

  const onAddToCart = () => {
    const success = handleAddToCart();
    if (success) {
      showAlert(`${product.name} added to cart!`);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ProductImage image={product.image} name={product.name} />
        </Grid>

        <Grid item xs={12} md={6}>
          <ProductDetails product={product} isInCart={isInCart} onAddToCart={onAddToCart} />
        </Grid>
      </Grid>

      <CustomAlert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={hideAlert}
      />
    </Container>
  );
};

export default Product;
