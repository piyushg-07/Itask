import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

export default function Cart() {
  const items = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (items.length === 0)
    return (
      <div className="max-w-xl mx-auto mt-10 text-center space-y-4">
        <p className="text-lg text-gray-600">Your cart is empty.</p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition"
        >
          Browse Menu
        </Link>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Your Cart</h2>

      {/* Cart items */}
      <div className="space-y-4">
        {items.map(i => (
          <CartItem key={i._id} item={i} />
        ))}
      </div>

      {/* Total and action */}
      <div className="p-4 border-t flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-800">
          Total: ₹{total.toFixed(2)}
        </div>
        <Link to="/order">
          <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition">
            Place Order
          </button>
        </Link>
      </div>
    </div>
  );
}
