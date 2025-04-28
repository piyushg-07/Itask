// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import MenuList from './components/MenuList';
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';
import OrderHistory from './components/OrderHistory';
import AdminMenuEditor from './components/AdminMenuEditor';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<MenuList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<OrderForm />} />
            <Route path="/history" element={<OrderHistory />} />
            <Route path="/admin" element={<AdminMenuEditor />} />
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
