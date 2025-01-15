import React from 'react';
import { Grid } from '@mui/material';
import { ProductCard } from './ProductCard';

const ProductList = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export { ProductList };
