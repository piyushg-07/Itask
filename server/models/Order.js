// For PostgreSQL, no Mongoose model needed, we use SQL queries via pool.
// But for modularity, let's define helper functions here.

const { pool } = require('../db');

// Insert a new order
const createOrder = async (name, phone_number, cart_items, total_price) => {
  const result = await pool.query(
    `INSERT INTO orders (name, phone_number, cart_items, total_price, created_at)
     VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
    [name, phone_number, JSON.stringify(cart_items), total_price]
  );
  return result.rows[0];
};

// Fetch orders by phone number
const getOrdersByPhone = async (phone_number) => {
  const result = await pool.query(
    `SELECT * FROM orders WHERE phone_number = $1`,
    [phone_number]
  );
  return result.rows;
};

module.exports = { createOrder, getOrdersByPhone };
