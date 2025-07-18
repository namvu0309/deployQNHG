import axios from 'axios';

export const BASE_URL = "http://localhost:8000";
const API_URL = `${BASE_URL}/api/admin/dishes`;

// Lấy token từ localStorage
const getToken = () => {
    const adminToken = localStorage.getItem("admin_token");
    return adminToken || null;
};

// Tạo axios instance dùng chung
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});

// Interceptor thêm Authorization header trước khi gửi request
apiClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ===== CRUD MÓN ĂN =====
export const getDishes = (params) => apiClient.get(`/list`, { params });
export const getTrashedDish = (params) => apiClient.get(`/trash`, { params });
export const getDish = (id) => apiClient.get(`/${id}/detail`);
export const createDish = (data) => apiClient.post(`/create`, data);
export const updateDish = (id, data) => apiClient.post(`/${id}/update`, data);
export const deleteSoftDish = (id) => apiClient.delete(`/${id}/soft/delete`);
export const deleteForceDish = (id) => apiClient.delete(`/${id}/force/delete`);
export const restoreDish = (id) => apiClient.post(`/${id}/restore`);