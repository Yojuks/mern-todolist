import axios from 'axios';

const api = axios.create({
  baseURL: 'http://18.170.221.142/api',
});

export const insertTodoItem = (payload) => api.post(`/todolist`, payload);
export const getAllTodoItems = () => api.get(`/todolists`);
export const updateTodoItemById = (id, payload) => api.put(`/todolist/${id}`, payload);
export const deleteTodoItemById = (id) => api.delete(`/todolist/${id}`);
export const deleteCompeteItems = (payload) => api.post(`/kill/`, payload);
export const getMovieById = (id) => api.get(`/todolist/${id}`);

const apis = {
  insertTodoItem,
  getAllTodoItems,
  updateTodoItemById,
  deleteTodoItemById,
  deleteCompeteItems,
  getMovieById,
};

export default apis;
