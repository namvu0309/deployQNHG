import axios from "axios";

export const BASE_URL = "http://localhost:8000";
const API_URL = `${BASE_URL}/api/admin/user/roles`;

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

export const getUserRoleList = (params) => {
    return apiClient.get(`/list`, { params });
};

export const createUserRole = (data) => {
    return apiClient.post(`/create`, data);
};

export const updateUserRole = (id, data) => {
    return apiClient.post(`/${id}/update`, data);
};

export const deleteUserRole = (id) => {
    return apiClient.post(`/${id}/delete`);
};
