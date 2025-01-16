import { Outlet } from 'react-router-dom';
import { Header } from '../components/shared/Header';
import { Box } from '@mui/material';
import { useCart } from '../hooks/useCart';

const Layout = () => {
  const { items } = useCart();

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header cartItemsCount={cartItemsCount} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>

      <Box component="footer" sx={{ p: 2, textAlign: 'center', mt: 'auto' }}>
        <p>© 2025</p>
      </Box>
    </Box>
  );
};

export { Layout };
