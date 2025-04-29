import React, { useState } from "react";
import { useDispatchCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const dispatch = useDispatchCart();
  const [qty, setQty] = useState(item.qty);

  const updateQty = (newQty) => {
    if (newQty < 1) return;
    setQty(newQty);
    dispatch({ type: "UPDATE_QTY", id: item._id, qty: newQty });
  };

  return (
    <div className="flex items-center justify-between bg-indigo-50 rounded-xl shadow-sm p-5 hover:shadow-md transition duration-200 border border-indigo-100 hover:border-indigo-300">
      {/* Item Details */}
      <div className="flex flex-col space-y-1">
        <h4 className="text-lg font-semibold text-indigo-800">{item.name}</h4>
        <p className="text-sm text-indigo-700">Price: ₹{Number(item.price).toFixed(2)}</p>
        <p className="text-sm text-indigo-700">
          Subtotal: ₹{(item.price * qty).toFixed(2)}
        </p>
      </div>

      {/* Quantity and Remove */}
      <div className="flex items-center space-x-4">
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => updateQty(Number(e.target.value))}
          className="w-16 h-10 text-center border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
        />
        <button
          onClick={() => dispatch({ type: "REMOVE_ITEM", id: item._id })}
          className="px-3 py-2 bg-red-100 text-red-600 font-medium rounded-md hover:bg-red-200 hover:text-red-700 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
