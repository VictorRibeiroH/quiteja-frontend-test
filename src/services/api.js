import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyapi.io/data/v1',
  headers: {
    'app-id': process.env.VUE_APP_DUMMY_API_KEY
  }
});

export const userService = {
  getUsers: (page = 0, limit = 20) => api.get(`/user?page=${page}&limit=${limit}`),
  getUser: (id) => api.get(`/user/${id}`),
  createUser: (userData) => api.post('/user/create', userData),
  updateUser: (id, userData) => api.put(`/user/${id}`, userData),
  deleteUser: (id) => api.delete(`/user/${id}`)
};