import { useParams } from "react-router-dom";
import { products } from "../constants/products";
import { useCart } from "./useCart";

export const useProduct = () => {
  const { productId } = useParams();
  const { addToCart, items } = useCart();
  
  const product = products.find((p) => p.id === parseInt(productId));
  const isInCart = items.some(item => item.id === product?.id);
  
  const handleAddToCart = (quantity = 1) => {
    if (product) {
      addToCart({ product, quantity });
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