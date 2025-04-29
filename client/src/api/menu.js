// src/api/menu.js
import axios from 'axios';
// export const fetchMenu = (category) =>
//   axios.get('/api/menu', { params: { category } }).then(res => res.data);
export const fetchMenu = (category) => {
    if (category) {
      // when filtering by category
      return axios
        .get('https://itask-6w1n.onrender.com/api/menu/category', { params: { category } })
        .then(res => res.data);
    }
    // when no filter
    return axios
      .get('https://itask-6w1n.onrender.com/api/menu')
      .then(res => res.data);
  };
export const createMenuItem = item =>
  axios.post('https://itask-6w1n.onrender.com/api/menu', item).then(res => res.data);
export const updateMenuItem = (id, item) =>
  axios.put(`https://itask-6w1n.onrender.com/api/menu/${id}`, item).then(res => res.data);
export const deleteMenuItem = id =>
  axios.delete(`https://itask-6w1n.onrender.com/api/menu/${id}`).then(res => res.data);
