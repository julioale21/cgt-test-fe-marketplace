import { useParams } from 'react-router-dom';
import { products } from '../constants/products';
import { useCart } from './useCart';

export const useProduct = () => {
  const { productId } = useParams();
  const { addToCart, items } = useCart();
  
  const product = products.find((p) => p.id === parseInt(productId));
  const isInCart = items.some(item => item.id === product?.id);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      return true;
    }
    return false;
  };

  return {
    product,
    isInCart,
    handleAddToCart
  };
};