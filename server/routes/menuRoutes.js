const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// Get all menu items Fetching all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Fetch all menu items (optionally by category)
router.get('/category', async (req, res) => {
    try {
      const { category } = req.query; // Read category from query parameters
  
      let filter = {};
      if (category) {
        filter.category = category; // If category is provided, filter by it
      }
  
      const items = await MenuItem.find(filter);
      res.json(items);
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Get single menu item by ID  Fetching a single menu item's details (if needed).
router.get('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Create a new menu item
router.post('/', async (req, res) => {
    try {
      const { name, description, price, category, imageUrl } = req.body;
  
      if (!name || !price || !category) {
        return res.status(400).json({ message: 'Name, Price, and Category are required fields.' });
      }
  
      const newItem = new MenuItem({
        name,
        description,
        price,
        category,
        imageUrl
      });
  
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  // Update a menu item by ID
router.put('/:id', async (req, res) => {
    try {
      const { name, description, price, category, imageUrl } = req.body;
  
      const updatedItem = await MenuItem.findByIdAndUpdate(
        req.params.id,
        { name, description, price, category, imageUrl },
        { new: true, runValidators: true }
      );
  
      if (!updatedItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
  
      res.json(updatedItem);
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

  // Delete a menu item by ID
router.delete('/:id', async (req, res) => {
    try {
      const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
      res.json({ message: 'Menu item deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
