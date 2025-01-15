import React from 'react';

import { Link } from 'react-router-dom';

import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductCard = ({ product }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
          sx={{
            objectFit: 'cover',
            height: '200px'
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {product.description}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
            ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Formats: {product.format.join(', ')}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <Button component={Link} to={`/products/${product.id}`} size="small" color="primary">
            View Details
          </Button>
          <Button size="small" variant="contained" color="primary" startIcon={<ShoppingCartIcon />}>
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export { ProductCard };
