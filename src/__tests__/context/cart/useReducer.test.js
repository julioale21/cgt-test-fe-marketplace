import { cartReducer } from "../../../context/cart/cartReducer";
import { CART_ACTIONS } from "../../../context/cart/types";

describe('cartReducer', () => {
  const initialState = {
    items: [],
    total: 0
  };

  const sampleProduct = {
    id: 1,
    name: 'Test Product',
    price: 10.00
  };

  describe('ADD_TO_CART', () => {
    it('should add a new item with quantity to an empty cart', () => {
      const action = {
        type: CART_ACTIONS.ADD_TO_CART,
        payload: {
          product: sampleProduct,
          quantity: 2
        }
      };

      const newState = cartReducer(initialState, action);

      expect(newState.items).toHaveLength(1);
      expect(newState.items[0]).toEqual({ ...sampleProduct, quantity: 2 });
      expect(newState.total).toBe(20.00);
    });

    it('should increment existing item quantity', () => {
      const stateWithItem = {
        items: [{ ...sampleProduct, quantity: 1 }],
        total: 10.00
      };

      const action = {
        type: CART_ACTIONS.ADD_TO_CART,
        payload: {
          product: sampleProduct,
          quantity: 2
        }
      };

      const newState = cartReducer(stateWithItem, action);

      expect(newState.items).toHaveLength(1);
      expect(newState.items[0].quantity).toBe(3);
      expect(newState.total).toBe(30.00);
    });

    it('should add new item with default quantity of 1', () => {
      const action = {
        type: CART_ACTIONS.ADD_TO_CART,
        payload: {
          product: sampleProduct
        }
      };

      const newState = cartReducer(initialState, action);

      expect(newState.items[0].quantity).toBe(1);
      expect(newState.total).toBe(10.00);
    });
  });

  describe('REMOVE_FROM_CART', () => {
    it('should remove an item from cart and update total', () => {
      const stateWithItem = {
        items: [{ ...sampleProduct, quantity: 2 }],
        total: 20.00
      };

      const action = {
        type: CART_ACTIONS.REMOVE_FROM_CART,
        payload: sampleProduct.id
      };

      const newState = cartReducer(stateWithItem, action);

      expect(newState.items).toHaveLength(0);
      expect(newState.total).toBe(0);
    });
  });

  describe('UPDATE_QUANTITY', () => {
    it('should increase item quantity and update total', () => {
      const stateWithItem = {
        items: [{ ...sampleProduct, quantity: 1 }],
        total: 10.00
      };

      const action = {
        type: CART_ACTIONS.UPDATE_QUANTITY,
        payload: { id: sampleProduct.id, quantity: 3 }
      };

      const newState = cartReducer(stateWithItem, action);

      expect(newState.items[0].quantity).toBe(3);
      expect(newState.total).toBe(30.00);
    });

    it('should decrease item quantity and update total', () => {
      const stateWithItem = {
        items: [{ ...sampleProduct, quantity: 3 }],
        total: 30.00
      };

      const action = {
        type: CART_ACTIONS.UPDATE_QUANTITY,
        payload: { id: sampleProduct.id, quantity: 1 }
      };

      const newState = cartReducer(stateWithItem, action);

      expect(newState.items[0].quantity).toBe(1);
      expect(newState.total).toBe(10.00);
    });

    it('should handle multiple items quantity update', () => {
      const initialStateWithMultipleItems = {
        items: [
          { ...sampleProduct, quantity: 1 },
          { id: 2, name: 'Another Product', price: 15.00, quantity: 1 }
        ],
        total: 25.00
      };

      const action = {
        type: CART_ACTIONS.UPDATE_QUANTITY,
        payload: { id: sampleProduct.id, quantity: 2 }
      };

      const newState = cartReducer(initialStateWithMultipleItems, action);

      expect(newState.items[0].quantity).toBe(2);
      expect(newState.total).toBe(35.00);
      expect(newState.items[1].quantity).toBe(1);
    });
  });

  describe('CLEAR_CART', () => {
    it('should remove all items and reset total', () => {
      const stateWithItems = {
        items: [
          { ...sampleProduct, quantity: 2 },
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