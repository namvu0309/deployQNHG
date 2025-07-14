import axios from "axios";

export const BASE_URL = "http://localhost:8000";
const API_URL = `${BASE_URL}/api/admin/permission/groups`;

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

export const getPermissionGroups = (params) => {
    return apiClient.get(`/list`, { params });
};

export const createPermissionGroup = (data) => {
    return apiClient.post(`/create`, data);
};

export const updatePermissionGroup = (id, data) => {
    return apiClient.post(`/${id}/update`, data);
};

export const deletePermissionGroup = (id) => {
    return apiClient.post(`/${id}/delete`);
};
