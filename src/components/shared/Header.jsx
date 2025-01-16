import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Toolbar, Typography, Badge, Container } from '@mui/material';
import PropTypes from 'prop-types';

const Header = ({ cartItemsCount = 0 }) => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg" disableGutters>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            Marketplace
          </Typography>
          <div>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
              Home
            </Link>
            <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Badge badgeContent={cartItemsCount} color="error" max={99}>
                <ShoppingCartIcon />
              </Badge>
            </Link>
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
