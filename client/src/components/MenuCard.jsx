import React from 'react';
import { useDispatchCart } from '../context/CartContext';

export default function MenuCard({ item }) {
  const dispatch = useDispatchCart();

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm
                 hover:shadow-lg hover:bg-gray-50 transition-all duration-200"
    >
      {/* Image */}
      <img
        src="https://static.toiimg.com/thumb/imgsize-2121869,msid-76179976,width-600,height-335,resizemode-75/76179976.jpg"
        alt={item.name}
        className="h-40 w-full object-cover"
      />

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-600 flex-1 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-600">
            ₹{Number(item.price).toFixed(2)}
          </span>
          <button
            onClick={() => dispatch({ type: 'ADD_ITEM', item })}
            className="px-3 py-1 bg-indigo-600 text-white text-sm font-medium rounded
                       hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300
                       transition-colors duration-150"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
