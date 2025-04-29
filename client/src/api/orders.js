// src/api/orders.js
import axios from 'axios';
export const placeOrder = data =>
  axios.post('https://itask-6w1n.onrender.com/api/orders', data).then(res => res.data);
export const fetchOrders = phone =>
  axios.get(`https://itask-6w1n.onrender.com/api/orders/${phone}`).then(res => res.data);
