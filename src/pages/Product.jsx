import React from 'react';

import { Container, Grid, Typography, Box, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';
import { products } from '../constants/products';
import { ProductHeader, ProductImage, ProductSpecs } from '../components';

const Product = () => {
  const { productId } = useParams();
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
              onClick={() => console.warn('Not implemented yet!')}
              sx={{ mt: 4 }}
              fullWidth
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Product;
