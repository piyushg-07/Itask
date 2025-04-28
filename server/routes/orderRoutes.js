const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { createOrder, getOrdersByPhone } = require('../models/Order');

// Place a new order
router.post(
    '/',
    [
      body('name').notEmpty().withMessage('Name is required'),
      body('phone_number')
        .matches(/^\+?\d{7,15}$/)
        .withMessage('Phone number is invalid'),
      body('cart_items')
        .isArray({ min: 1 })
        .withMessage('Cart must contain at least one item'),
      body('total_price')
        .isFloat({ gt: 0 })
        .withMessage('Total price must be a number greater than zero'),
    ],
    async (req, res) => {
      // catch validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
      }
  
      try {
        const { name, phone_number, cart_items, total_price } = req.body;
        const order = await createOrder(name, phone_number, cart_items, total_price);
        res.status(201).json(order);
      } catch (err) {
        // normalized error response
        res.status(500).json({ error: err.message });
      }
    }
  );

// Get orders by phone number
router.get('/:phone', async (req, res) => {
  try {
    const orders = await getOrdersByPhone(req.params.phone);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
