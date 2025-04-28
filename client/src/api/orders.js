// src/api/orders.js
import axios from 'axios';
export const placeOrder = data =>
  axios.post('/api/orders', data).then(res => res.data);
export const fetchOrders = phone =>
  axios.get(`/api/orders/${phone}`).then(res => res.data);
