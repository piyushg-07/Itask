const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
