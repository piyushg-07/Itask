// src/components/OrderForm.jsx
import React, { useState } from 'react';
import { useCart, useDispatchCart } from '../context/CartContext';
import { placeOrder } from '../api/orders';
import { useNavigate } from 'react-router-dom';

export default function OrderForm() {
  const items = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    phone_number: ''
  });
  const [error, setError] = useState('');

  // Calculate grand total
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    // Shape cart_items to only include name, price, quantity
    const payload = {
      name: form.name,
      phone_number: form.phone_number,
      cart_items: items.map(i => ({
        name: i.name,
        price: i.price,
        quantity: i.qty
      })),
      total_price: total
    };

    try {
      await placeOrder(payload);
      dispatch({ type: 'CLEAR' });
      navigate('/history', {
        state: { fromOrder: true, phone: form.phone_number }
      });
    } catch (e) {
      setError(e.response?.data?.error || e.message);
    }
  };

  return (
    <form
    onSubmit={handleSubmit}
    className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-6"
  >
    <h2 className="text-2xl font-bold text-center text-gray-800">
      Place Your Order
    </h2>

    {error && (
      <p className="text-red-700 bg-red-100 p-2 rounded">
        {error}
      </p>
    )}

    <div>
      <label className="block mb-1 font-medium text-gray-700">Name</label>
      <input
        type="text"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
        className="w-full p-3 border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-indigo-400
                   transition-colors duration-150"
        placeholder="John Doe"
      />
    </div>

    <div>
      <label className="block mb-1 font-medium text-gray-700">
        Phone Number
      </label>
      <input
        type="tel"
        value={form.phone_number}
        onChange={e => setForm({ ...form, phone_number: e.target.value })}
        required
        className="w-full p-3 border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-indigo-400
                   transition-colors duration-150"
        placeholder="+1 234 567 8901"
      />
    </div>

    <div className="pt-4 border-t border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-medium text-gray-700">Total</span>
        <span className="text-xl font-bold text-indigo-600">
          ₹{total.toFixed(2)}
        </span>
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600
                   text-white font-semibold rounded-lg shadow-sm
                   hover:from-indigo-700 hover:to-purple-700
                   transition-all duration-200"
      >
        Confirm Order
      </button>
    </div>
  </form>
  );
}
