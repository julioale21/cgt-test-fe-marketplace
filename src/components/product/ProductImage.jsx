import React from 'react';

import { Card, CardMedia } from '@mui/material';
import PropTypes from 'prop-types';

const ProductImage = ({ image, name }) => (
  <Card elevation={2}>
    <CardMedia
      component="img"
      image={image}
      alt={name}
      sx={{
        height: 500,
        objectFit: 'cover'
      }}
    />
  </Card>
);

ProductImage.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export { ProductImage };
