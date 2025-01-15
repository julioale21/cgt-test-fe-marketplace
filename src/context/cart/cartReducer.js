import { CART_ACTIONS } from './types';

export const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        return {
          ...state,
          items: updatedItems,
          total: state.total + action.payload.price
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price
      };
    }

    case CART_ACTIONS.REMOVE_FROM_CART: {
      const itemToRemove = state.items.find((item) => item.id === action.payload);
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        total: state.total - (itemToRemove.price * itemToRemove.quantity)
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
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