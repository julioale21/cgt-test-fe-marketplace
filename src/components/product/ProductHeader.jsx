import React from 'react';

import { Typography, Box, Rating, Chip } from '@mui/material';
import PropTypes from 'prop-types';

const ProductHeader = ({ name, rating, category }) => (
  <>
    <Typography variant="h4" gutterBottom>
      {name}
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Rating value={rating} precision={0.1} readOnly />
      <Typography variant="body2" sx={{ ml: 1 }}>
        ({rating})
      </Typography>
      <Chip label={category} sx={{ ml: 2 }} size="small" color="primary" />
    </Box>
  </>
);

ProductHeader.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired
};

export { ProductHeader };
