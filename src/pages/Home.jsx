import React from 'react';

import { Container, Typography } from '@mui/material';
import { products } from '../constants/products';
import { ProductList } from '../components';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" sx={{ mt: 4, mb: 4 }}>
        3D Marketplace
      </Typography>

      <ProductList products={products} />
    </Container>
  );
};

export default Home;
