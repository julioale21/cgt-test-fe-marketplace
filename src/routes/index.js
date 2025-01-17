import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout';
import Home from '../pages/Home';
import Product from '../pages/Product';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';


export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  );
}