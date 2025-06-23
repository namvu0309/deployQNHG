import axios from 'axios';

const API_URL = "http://localhost:8000/api/admin/categories";

// ===== CRUD DANH MỤC =====
export const getCategories = (params) => axios.get(`${API_URL}/list`, { params });
export const getCategory = (id) => axios.get(`${API_URL}/${id}/detail`);
export const createCategory = (data) => axios.post(`${API_URL}/create`, data);
export const updateCategory = (id, data) => axios.post(`${API_URL}/${id}/update`, data, {
    headers: { "Content-Type": "multipart/json" },
});
export const deleteCategory = (id) => axios.delete(`${API_URL}/${id}/delete`);