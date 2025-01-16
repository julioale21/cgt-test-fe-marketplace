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
      <Container
        maxWidth={false}
        sx={{
          p: { xs: 2, md: 4 },
          maxWidth: '1400px !important',
          mx: 'auto',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography
          variant="h4"
          align="center"
          color="text.secondary"
          sx={{
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
          }}
        >
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
    <Container
      maxWidth={false}
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: '1400px !important',
        mx: 'auto'
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        sx={{
          minHeight: '80vh',
          alignItems: 'flex-start'
        }}
      >
        <Grid item xs={12} md={6}>
          <ProductImage image={product.image} name={product.name} />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
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
