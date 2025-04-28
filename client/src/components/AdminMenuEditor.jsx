// src/components/AdminMenuEditor.jsx
import React, { useState, useEffect } from 'react';
import {
  fetchMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../api/menu';

export default function AdminMenuEditor() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    imageUrl: '',
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadItems() {
      try {
        const data = await fetchMenu();
        setItems(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load menu items');
      }
    }
    loadItems();
  }, []);

  const resetForm = () => {
    setForm({ name: '', price: '', category: '', description: '', imageUrl: '' });
    setEditId(null);
    setError('');
  };

  const refresh = async () => {
    try {
      const data = await fetchMenu();
      setItems(data);
    } catch (err) {
      console.error(err);
      setError('Failed to refresh menu');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      if (editId) {
        await updateMenuItem(editId, form);
      } else {
        await createMenuItem(form);
      }
      resetForm();
      await refresh();
    } catch (err) {
      console.error(err);
      setError('Failed to save item');
    }
  };

  const handleDelete = async id => {
    setError('');
    try {
      await deleteMenuItem(id);
      await refresh();
    } catch (err) {
      console.error(err);
      setError('Failed to delete item');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      <h2 className="text-3xl font-bold text-gray-800">Admin: Menu Editor</h2>
      {error && <p className="text-red-600">{error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {['name', 'price', 'category', 'description', 'imageUrl'].map(field => (
          <input
            key={field}
            type={field === 'price' ? 'number' : 'text'}
            step={field === 'price' ? '0.01' : undefined}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={e => setForm({ ...form, [field]: e.target.value })}
            required={['name', 'price', 'category'].includes(field)}
            className="p-2 border rounded shadow-sm focus:ring-indigo-300 focus:border-indigo-500"
          />
        ))}
        <button
          type="submit"
          className="col-span-1 md:col-span-2 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          {editId ? 'Update Item' : 'Add Item'}
        </button>
      </form>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden flex flex-col"
          >
            <div
              className="h-40 bg-cover bg-center"
              style={{
                backgroundImage: `url("https://static.toiimg.com/thumb/imgsize-2121869,msid-76179976,width-600,height-335,resizemode-75/76179976.jpg")`
              }}
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">{item.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-indigo-600">
                  ₹{Number(item.price).toFixed(2)}
                </span>
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      setEditId(item._id);
                      setForm({
                        name: item.name,
                        price: item.price,
                        category: item.category,
                        description: item.description || '',
                        imageUrl: item.imageUrl || "",
                      });
                    }}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
