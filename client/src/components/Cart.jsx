import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

export default function Cart() {
  const items = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (items.length === 0)
    return <p>Your cart is empty. <Link to="/">Browse menu</Link></p>;

  return (
    <>
      <div className="space-y-4">
        {items.map(i => (
          <CartItem key={i._id} item={i} />
        ))}
      </div>
      <div className="mt-4">
        <h2>Total: ₹{total.toFixed(2)}</h2>
        <Link to="/order">
          <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded">
            Place Order
          </button>
        </Link>
      </div>
    </>
  );
}
