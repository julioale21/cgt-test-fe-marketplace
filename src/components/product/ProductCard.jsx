import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { OutlinedButton } from '../buttons/OutlinedButton';
import { ContainedButton } from '../buttons/ContainedButton';
import { useCart } from '../../hooks/useCart';
import { useSnackbar } from 'notistack';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { enqueueSnackbar } = useSnackbar();

  if (!product) {
    return null;
  }

  const { id, name, price, description, image, format, rating, polygons, textures } = product;

  const handleAddToCart = () => {
    addToCart({ product, quantity: 1 });
    enqueueSnackbar('Product added to cart', { variant: 'success' });
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'box-shadow 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }
          }}
        >
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <CardMedia
              component="img"
              height="200"
              image={image}
              alt={name}
              sx={{
                objectFit: 'cover',
                height: '200px',
                transition: 'transform 0.3s ease-in-out'
              }}
            />
          </motion.div>

          <CardContent sx={{ flexGrow: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography gutterBottom variant="h6" component="h2">
                {name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  height: '40px'
                }}
              >
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
            </motion.div>
          </CardContent>

          <CardActions
            sx={{
              justifyContent: 'flex-end',
              gap: 1,
              px: 1.5,
              pb: 1.5,
              pt: 0
            }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <OutlinedButton component={Link} to={`/products/${id}`}>
                View Details
              </OutlinedButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ContainedButton
                onClick={handleAddToCart}
                startIcon={<ShoppingCartIcon sx={{ fontSize: '1rem' }} />}
              >
                Add to Cart
              </ContainedButton>
            </motion.div>
          </CardActions>
        </Card>
      </motion.div>
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
