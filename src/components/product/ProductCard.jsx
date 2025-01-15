import React from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { OutlinedButton } from '../buttons/OutlinedButton';
import { ContainedButton } from '../buttons/ContainedButton';



const ProductCard = ({ product }) => {
  if (!product) {
    return null;
  }

  const { id, name, price, description, image, format, rating, polygons, textures } = product;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={name}
          sx={{
            objectFit: 'cover',
            height: '200px'
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {description}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
            ${price.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {rating}/5
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Polygons: {polygons}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Textures: {textures}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Formats: {format.join(', ')}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'space-between',
            px: 1.5,
            pb: 1.5,
            pt: 0
          }}
        >
          <OutlinedButton component={Link} to={`/products/${id}`}>
            View Details
          </OutlinedButton>
          <ContainedButton startIcon={<ShoppingCartIcon sx={{ fontSize: '1rem' }} />}>
            Add to Cart
          </ContainedButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
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
};

export { ProductCard };
