import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const cart = useCart();
  // const location = useLocation();
  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <nav className="bg-gray-50 shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-700 hover:text-indigo-900 tracking-wide transition"
        >
          Digital Diner
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 text-sm font-medium text-gray-700">
          <Link
            to="/"
            className="hover:text-indigo-600 transition"
          >
            Menu
          </Link>

          <Link
            to="/cart"
            className="relative hover:text-indigo-600 transition"
          >
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-3 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center shadow-sm">
                {itemCount}
              </span>
            )}
          </Link>

          <Link
            to="/history"
            className="hover:text-indigo-600 transition"
          >
            History
          </Link>

          {/* {location.pathname === '/admin' && ( */}
            <Link
              to="/admin"
              className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Admin
            </Link>
          {/* // )} */}
        </div>
      </div>
    </nav>
  );
}
