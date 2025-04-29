import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchOrders } from '../api/orders';

export default function OrderHistory() {
  const { state } = useLocation();
  const [phone, setPhone] = useState(state?.phone || '');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // 🆕 Loading state

  const lookup = async () => {
    setLoading(true); // Start loading
    setError('');
    setOrders([]);
    try {
      const data = await fetchOrders(phone);
      setOrders(data);
    } catch (e) {
      setError(e.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <h2 className="text-3xl font-bold text-center text-indigo-700">Order History</h2>

      {/* Phone lookup */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Enter phone number"
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button
          onClick={lookup}
          className="px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
        >
          {loading ? 'Loading...' : 'Lookup'}
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-600 text-center font-medium">{error}</p>}

      {/* Loading Indicator */}
      {loading && <p className="text-center text-gray-500 italic">Fetching your orders...</p>}

      {/* Orders */}
      {!loading && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <p className="text-center italic text-gray-500">No orders found.</p>
          ) : (
            orders.map((o) => (
              <div
                key={o.id}
                className="bg-white border border-gray-200 rounded-xl shadow-md p-5 space-y-3 transition hover:shadow-lg"
              >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">Order #{o.id}</p>
                    <p className="text-sm text-gray-600">{o.name}</p>
                    <p className="text-sm text-gray-600">{o.phone_number}</p>
                  </div>
                  <p className="text-sm text-gray-500">{new Date(o.created_at).toLocaleString()}</p>
                </div>

                {/* Items */}
                <div className="divide-y divide-gray-100">
                  {o.cart_items.map((item, idx) => (
                    <div key={idx} className="flex justify-between py-1 text-sm text-gray-700">
                      <span>{item.quantity}× {item.name}</span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-between pt-3 border-t font-bold text-gray-800">
                  <span>Total</span>
                  <span>₹{Number(o.total_price).toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
