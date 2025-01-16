import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './themes/theme';
import { AppRoutes } from './routes';
import { CartProvider } from './context/cart/cartProvider';
import { SnackbarProvider } from 'notistack'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <CartProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </CartProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
