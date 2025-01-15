import React from 'react';

import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { ProductCard } from './ProductCard';

const ProductList = ({ products }) => {
  if (!products?.length) {
    return null;
  }

  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      format: PropTypes.arrayOf(PropTypes.string).isRequired,
      polygons: PropTypes.string.isRequired,
      textures: PropTypes.string.isRequired
    })
  )
};

ProductList.defaultProps = {
  products: []
};

export { ProductList };
