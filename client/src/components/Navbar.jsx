// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const cart = useCart();
  const location = useLocation();
  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Digital Diner
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Menu
          </Link>

          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-3 flex items-center justify-center h-5 w-5 text-xs bg-red-500 text-white rounded-full">
                {itemCount}
              </span>
            )}
          </Link>

          <Link
            to="/history"
            className="text-gray-700 hover:text-indigo-600 transition-colors"
          >
            History
          </Link>

          {location.pathname === '/admin' && (
            <Link
              to="/admin"
              className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
