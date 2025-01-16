// import React from 'react';

// import { Card, CardMedia } from '@mui/material';
// import PropTypes from 'prop-types';

// const ProductImage = ({ image, name }) => (
//   <Card elevation={2}>
//     <CardMedia
//       component="img"
//       image={image}
//       alt={name}
//       sx={{
//         height: 500,
//         objectFit: 'cover'
//       }}
//     />
//   </Card>
// );

// ProductImage.propTypes = {
//   image: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired
// };

import { Card, CardMedia } from '@mui/material';
import PropTypes from 'prop-types';
const ProductImage = ({ image, name }) => (
  <Card
    elevation={0}
    sx={{
      position: 'relative',
      backgroundColor: 'transparent',
      '&:hover img': {
        transform: 'scale(1.02)',
        transition: 'transform 0.3s ease-in-out'
      }
    }}
  >
    <CardMedia
      component="img"
      image={image}
      alt={name}
      sx={{
        height: 'auto',
        maxHeight: '600px',
        width: '100%',
        objectFit: 'contain',
        borderRadius: 2,
        transition: 'transform 0.3s ease-in-out'
      }}
    />
  </Card>
);

ProductImage.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export { ProductImage };
