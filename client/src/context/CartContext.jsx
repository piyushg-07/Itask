import React, { createContext, useReducer, useContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.find(i => i._id === action.item._id);
      if (exists) return state.map(i =>
        i._id === action.item._id
          ? { ...i, qty: i.qty + 1 }
          : i
      );
      return [...state, { ...action.item, qty: 1 }];
    }

    case 'REMOVE_ITEM':
      return state.filter(i => i._id !== action.id);

    case 'UPDATE_QTY':
      return state.map(i =>
        i._id === action.id
          ? { ...i, qty: action.qty }
          : i
      );

    case 'CLEAR':
      return [];

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
