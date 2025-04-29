import React, { useState, useEffect, useMemo } from 'react';
import { fetchMenu } from '../api/menu';  // now always calls GET /api/menu
import MenuCard from './MenuCard';

export default function MenuList() {
  const [allItems, setAllItems] = useState([]);    // full list
  const [category, setCategory] = useState('');    // current filter
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Fetch once on mount
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchMenu();           // no arg: fetch all
        setAllItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.log(e)
        setError( 'An error occurred');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 2. Derive filtered list
  const items = useMemo(() => {
    return category
      ? allItems.filter(item => item.category === category)
      : allItems;
  }, [allItems, category]);

  // 3. Build category dropdown from allItems
  const categories = useMemo(() => {
    const cats = allItems.map(i => i.category);
    return ['All', ...Array.from(new Set(cats))];
  }, [allItems]);

  return (
    <div>
      {error && <p className="text-red-600">{error}</p>}

      {/* Category selector */}
      <select
        value={category || 'All'}
        onChange={e =>
          setCategory(e.target.value === 'All' ? '' : e.target.value)
        }
        className="mb-4 p-2 border"
      >
        {categories.map(cat => (
          <option key={cat} value={cat === 'All' ? '' : cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Loading state */}
      {loading ? (
        <p>Loading menu…</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.length > 0 ? (
            items.map(item => (
              <MenuCard key={item._id} item={item} />
            ))
          ) : (
            <p>No items found in this category.</p>
          )}
        </div>
      )}
    </div>
  );
}
