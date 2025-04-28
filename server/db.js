// db.js
const mongoose = require('mongoose');
const { Pool } = require('pg');
require('dotenv').config();

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});

// Handle errors on the pool (these are fatal unless caught)
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle PG client', err);
  // depending on your needs you might process.exit(1) here,
  // or attempt to reconnect, or alert an admin, etc.
});

// Test the initial connection, then immediately release the client
pool
  .connect()
  .then((client) => {
    console.log('PostgreSQL connected');
    client.release();
  })
  .catch((err) => {
    console.error('PostgreSQL connection error:', err);
  });

module.exports = { pool };
