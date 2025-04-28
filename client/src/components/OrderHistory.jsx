// src/components/OrderHistory.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchOrders } from '../api/orders';

export default function OrderHistory() {
  const { state } = useLocation();
  const [phone, setPhone] = useState(state?.phone || '');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const lookup = async () => {
    try {
      const data = await fetchOrders(phone);
      setOrders(data);
      setError('');
    } catch (e) {
      setError(e.response?.data?.error || e.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h2 className="text-2xl font-semibold">Your Past Orders</h2>

      {/* Phone lookup */}
      <div className="flex space-x-2">
        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Enter phone number"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={lookup}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Lookup
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {/* Orders list */}
      {orders.length === 0 ? (
        <p className="italic text-gray-500">No orders found.</p>
      ) : (
        orders.map(o => (
          <div
            key={o.id}
            className="border rounded-lg p-4 shadow-sm space-y-2"
          >
            {/* Header */}
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Order #{o.id}</p>
                <p className="text-sm text-gray-600">{o.name}</p>
                <p className="text-sm text-gray-600">{o.phone_number}</p>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(o.created_at).toLocaleString()}
              </p>
            </div>

            {/* Items */}
            <div className="space-y-1">
              {o.cart_items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.quantity}× {item.name}
                  </span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between mt-2 font-semibold">
              <span>Total</span>
              <span>₹{Number(o.total_price).toFixed(2)}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
