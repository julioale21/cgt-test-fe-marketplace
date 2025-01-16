import { CART_ACTIONS } from './types';

export const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const { product, quantity = 1 } = action.payload;

      if (!product || product.price === undefined) {
        console.error("Invalid product passed to ADD_TO_CART action");
        return state;
      }

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );
    
      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
    
        return {
          ...state,
          items: updatedItems,
          total: state.total + (product.price * quantity)
        };
      }
    
      return {
        ...state,
        items: [...state.items, { ...product, quantity }],
        total: state.total + (product.price * quantity)
      };
    }

    case CART_ACTIONS.REMOVE_FROM_CART: {
      const itemToRemove = state.items.find((item) => item.id === action.payload);

      if (!itemToRemove) {
        console.error(`Item with id ${action.payload} not found in REMOVE_FROM_CART action`);
        return state;
      }

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        total: state.total - (itemToRemove.price * itemToRemove.quantity)
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;

      const item = state.items.find((item) => item.id === id);

      if (!item) {
        console.error(`Item with id ${id} not found in UPDATE_QUANTITY action`);
        return state;
      }

      if (quantity <= 0) {
        console.error("Quantity must be greater than 0 in UPDATE_QUANTITY action");
        return state;
      }

      const quantityDiff = quantity - item.quantity;

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
        total: state.total + (item.price * quantityDiff)
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        items: [],
        total: 0
      };

    default:
      return state;
  }
};
