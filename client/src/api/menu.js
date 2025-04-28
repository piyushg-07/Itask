// src/api/menu.js
import axios from 'axios';
// export const fetchMenu = (category) =>
//   axios.get('/api/menu', { params: { category } }).then(res => res.data);
export const fetchMenu = (category) => {
    if (category) {
      // when filtering by category
      return axios
        .get('/api/menu/category', { params: { category } })
        .then(res => res.data);
    }
    // when no filter
    return axios
      .get('/api/menu')
      .then(res => res.data);
  };
export const createMenuItem = item =>
  axios.post('/api/menu', item).then(res => res.data);
export const updateMenuItem = (id, item) =>
  axios.put(`/api/menu/${id}`, item).then(res => res.data);
export const deleteMenuItem = id =>
  axios.delete(`/api/menu/${id}`).then(res => res.data);
