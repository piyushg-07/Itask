import React, { useState } from 'react';
import { useDispatchCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const dispatch = useDispatchCart();
  const [qty, setQty] = useState(item.qty);

  const updateQty = newQty => {
    setQty(newQty);
    dispatch({ type: 'UPDATE_QTY', id: item._id, qty: newQty });
  };

  return (
    <div
      className="flex items-center justify-between bg-white shadow hover:shadow-lg rounded-lg p-4 mb-4
                 transition-shadow duration-200 border border-transparent hover:border-indigo-200"
    >
      {/* Item Info */}
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-indigo-800">{item.name}</h4>
        <p className="text-indigo-600 mt-1">₹{Number(item.price).toFixed(2)}</p>
      </div>

      {/* Quantity Input */}
      <div className="flex items-center space-x-2">
        <input
          type="number"
          min="1"
          value={qty}
          onChange={e => updateQty(Number(e.target.value))}
          className="w-16 p-2 border border-gray-300 rounded text-center
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
                     transition-colors duration-150"
        />
        <button
          onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item._id })}
          className="ml-4 px-3 py-1 bg-red-50 text-red-600 rounded
                     hover:bg-red-100 hover:text-red-800 transition-colors duration-150"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
