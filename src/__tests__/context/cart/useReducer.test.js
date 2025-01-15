import { cartReducer } from "../../../context/cart/cartReducer";
import { CART_ACTIONS } from "../../../context/cart/types";

describe('cartReducer', () => {
  const initialState = {
    items: [],
    total: 0
  };

  const sampleItem = {
    id: 1,
    name: 'Test Product',
    price: 10.00
  };

  describe('ADD_TO_CART', () => {
    it('should add a new item to an empty cart', () => {
      const action = {
        type: CART_ACTIONS.ADD_TO_CART,
        payload: sampleItem
      };

      const newState = cartReducer(initialState, action);

      expect(newState.items).toHaveLength(1);
      expect(newState.items[0]).toEqual({ ...sampleItem, quantity: 1 });
      expect(newState.total).toBe(10.00);
    });

    it('should increment quantity for existing item', () => {
      const stateWithItem = {
        items: [{ ...sampleItem, quantity: 1 }],
        total: 10.00
      };

      const action = {
        type: CART_ACTIONS.ADD_TO_CART,
        payload: sampleItem
      };

      const newState = cartReducer(stateWithItem, action);

      expect(newState.items).toHaveLength(1);
      expect(newState.items[0].quantity).toBe(2);
      expect(newState.total).toBe(20.00);
    });
  });

  describe('REMOVE_FROM_CART', () => {
    it('should remove an item from cart', () => {
      const stateWithItem = {
        items: [{ ...sampleItem, quantity: 2 }],
        total: 20.00
      };

      const action = {
        type: CART_ACTIONS.REMOVE_FROM_CART,
        payload: sampleItem.id
      };

      const newState = cartReducer(stateWithItem, action);

      expect(newState.items).toHaveLength(0);
      expect(newState.total).toBe(0);
    });
  });

  describe('UPDATE_QUANTITY', () => {
    it('should increase item quantity', () => {
      const stateWithItem = {
        items: [{ ...sampleItem, quantity: 1 }],
        total: 10.00
      };

      const action = {
        type: CART_ACTIONS.UPDATE_QUANTITY,
        payload: { id: sampleItem.id, quantity: 3 }
      };

      const newState = cartReducer(stateWithItem, action);

      expect(newState.items[0].quantity).toBe(3);
      expect(newState.total).toBe(30.00);
    });

    it('should decrease item quantity', () => {
      const stateWithItem = {
        items: [{ ...sampleItem, quantity: 3 }],
        total: 30.00
      };

      const action = {
        type: CART_ACTIONS.UPDATE_QUANTITY,
        payload: { id: sampleItem.id, quantity: 1 }
      };

      const newState = cartReducer(stateWithItem, action);

      expect(newState.items[0].quantity).toBe(1);
      expect(newState.total).toBe(10.00);
    });
  });

  describe('CLEAR_CART', () => {
    it('should clear all items from cart', () => {
      const stateWithItems = {
        items: [
          { ...sampleItem, quantity: 2 },
          { id: 2, name: 'Another Product', price: 15.00, quantity: 1 }
        ],
        total: 35.00
      };

      const action = {
        type: CART_ACTIONS.CLEAR_CART
      };

      const newState = cartReducer(stateWithItems, action);

      expect(newState.items).toHaveLength(0);
      expect(newState.total).toBe(0);
    });
  });

  describe('unknown action', () => {
    it('should return current state for unknown action type', () => {
      const action = {
        type: 'UNKNOWN_ACTION'
      };

      const newState = cartReducer(initialState, action);

      expect(newState).toEqual(initialState);
    });
  });
});