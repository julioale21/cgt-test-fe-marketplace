import React from 'react';
import { Container, Typography } from '@mui/material';
import { products } from '../constants/products';
import { ProductList } from '../components';

const Home = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: '1400px !important',
        mx: 'auto'
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          mt: 4,
          mb: 4,
          fontSize: { xs: '2rem', md: '3rem' }
        }}
      >
        3D Marketplace
      </Typography>

      <ProductList products={products} />
    </Container>
  );
};

export default Home;
