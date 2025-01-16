import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Toolbar, Typography, Badge, Container, Button } from '@mui/material';
import PropTypes from 'prop-types';

const Header = ({ cartItemsCount = 0 }) => {
  return (
    <AppBar position="sticky">
      <Container
        maxWidth={false}
        sx={{
          maxWidth: '1400px !important',
          mx: 'auto'
        }}
        disableGutters
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            px: { xs: 2, md: 4 },
            minHeight: { xs: '64px', sm: '70px' }
          }}
        >
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 600,
              fontSize: { xs: '1.1rem', sm: '1.3rem' },
              '&:hover': {
                opacity: 0.8,
                transition: 'opacity 0.2s ease-in-out'
              }
            }}
          >
            Marketplace
          </Typography>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Button
              component={Link}
              to="/"
              color="inherit"
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                fontSize: { xs: '0.9rem', sm: '1rem' },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Home
            </Button>

            <Button
              component={Link}
              to="/cart"
              color="inherit"
              sx={{
                minWidth: 'auto',
                p: 1,
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <Badge
                badgeContent={cartItemsCount}
                color="error"
                max={99}
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.75rem',
                    height: '20px',
                    minWidth: '20px'
                  }
                }}
              >
                <ShoppingCartIcon sx={{ fontSize: { xs: '1.3rem', sm: '1.5rem' } }} />
              </Badge>
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Header.propTypes = {
  cartItemsCount: PropTypes.number
};

export { Header };
